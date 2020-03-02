const ExcelJs = require("exceljs")

module.exports = async workbook => {
    return (await Promise.all(workbook.worksheets.map(async worksheet => await workbook.getWorksheet(worksheet.name))))
        .filter(filterCollectionWorksheet)
        .map(clearCollectionWorksheetName)
}

const filterCollectionWorksheet = worksheet => worksheet.name && worksheet.name.match("(collection)")

const clearCollectionWorksheetName = worksheet => ({
    ...worksheet,
    name: worksheet.name
        ? worksheet.name
              .replace("(collection)", "")
              .trim()
              .replace(" ", "_")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^\w\d]/g, "")
        : "",
})
