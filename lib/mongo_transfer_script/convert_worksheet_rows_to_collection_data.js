module.exports = (worksheet, properties) =>
    worksheet._rows
        .filter(notIsFirstRow)
        .map(row => removeNotValidCellsFromRow(row, properties))
        .map(row => buildCollectionDataset(row, properties))

const notIsFirstRow = (row, index) => index > 0

const removeNotValidCellsFromRow = (row, properties) => ({
    ...row,
    _cells: row._cells.filter(cell => properties.find(property => property.column == cell._address.replace(/[\d]/g, ""))),
})

const buildCollectionDataset = (row, properties) =>
    properties.reduce((dataSet, property) => {
        const cell = row._cells.find(cell => cell._address.replace(/[\d]/g, "") == property.column)
        return { ...dataSet, [property.name]: cell && cell._value && cell._value.model && cell._value.model.value ? cell._value.model.value : null }
    }, {})
