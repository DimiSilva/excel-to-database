const ExcelJs = require("exceljs")
const MongoDB = require("mongodb")

const ExtractCollectionWorksheetsFromWorkbook = require("./extract_collection_worksheets_from_workbook")
const ConvertCellsToProperties = require("./convert_cells_to_properties")
const convertWorksheetRowsToCollectionData = require("./convert_worksheet_rows_to_collection_data")

module.exports = async (connectionString, excelPath) => {
    const workbook = await new ExcelJs.Workbook().xlsx.readFile(excelPath)
    const collectionWorksheets = await ExtractCollectionWorksheetsFromWorkbook(workbook)

    const collections = collectionWorksheets.map(worksheet => {
        const properties = ConvertCellsToProperties(worksheet)
        return {
            name: worksheet.name,
            datasets: convertWorksheetRowsToCollectionData(worksheet, properties),
            update: !!properties.find(propertie => propertie.name === "_id") ? true : false,
        }
    })

    const bruteTransferResponses = await transferToDatabase(collections, connectionString)
    const treatedTransferResponses = treatTransferResponses(bruteTransferResponses, collections)

    return treatedTransferResponses
    // return collectionWorksheets[0]._rows[0]._cells
}

const transferToDatabase = async (collections, connectionString) => {
    const connection = await MongoDB.MongoClient.connect(connectionString, { useUnifiedTopology: true })
    const db = connection.db()

    const transferResponses = await Promise.all(collections.map(async collection => await insertOrUpdateDatasetsFromCollection(collection, db)))

    connection.close()

    return transferResponses
}

const insertOrUpdateDatasetsFromCollection = async (collection, db) =>
    collection.update ? await updateDatasetsFromCollection(collection, db) : await insertDatasetsInCollection(collection, db)

const updateDatasetsFromCollection = async (collection, db) =>
    await Promise.all(
        collection.datasets.map(
            async dataset =>
                await db.collection(collection.name).updateOne(
                    { _id: MongoDB.ObjectID(dataset._id) },
                    Object.entries(dataset)
                        .filter(([key, value]) => key !== "_id")
                        .reduce((updateObject, [key, value]) => ({ ...updateObject, $set: { ...updateObject.$set, [key]: value } }), {})
                )
        )
    )

const insertDatasetsInCollection = async (collection, db) => await db.collection(collection.name).insertMany(collection.datasets)

const treatTransferResponses = (bruteTransferResponses, collections) =>
    collections.map((collection, index) => ({
        collection: collection.name,
        [collection.update ? "updatedDocuments" : "insertedDocuments"]: collection.update
            ? bruteTransferResponses[index].reduce((count, bruteTransferResponse) => (count += bruteTransferResponse.modifiedCount), 0)
            : bruteTransferResponses[index].result.n,
    }))
