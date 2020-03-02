const ExcelJs = require("exceljs")

module.exports = worksheet => worksheet._rows[0]._cells.filter(filterPropertieCells).map(clearCellPropertieName)

const filterPropertieCells = cell => cell._value && cell._value.model && cell._value.model.type === 3 && cell._value.model.value.match("(propertie)")

const clearCellPropertieName = cell => ({
    column: cell._address.replace(/[\d]/g, ""),
    name: cell._value.model.value
        .replace("(propertie)", "")
        .trim()
        .replace(" ", "_")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\d]/g, ""),
})
