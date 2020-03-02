module.exports = (worksheet, properties) =>
    worksheet._rows
        .filter(notIsFirstRow)
        .map(row => removeNotValidCellsFromRow(row, properties))
        .map(row => buildCollectionDataset(row, properties))

const notIsFirstRow = (row, index) => index > 0

const removeNotValidCellsFromRow = (row, properties) => ({
    ...row,
    _cells: row._cells.filter(cell => properties.find(propertie => propertie.column == cell._address.replace(/[\d]/g, ""))),
})

const buildCollectionDataset = (row, properties) =>
    properties.reduce((dataSet, propertie) => {
        const cell = row._cells.find(cell => cell._address.replace(/[\d]/g, "") == propertie.column)
        return { ...dataSet, [propertie.name]: cell && cell._value && cell._value.model && cell._value.model.value ? cell._value.model.value : null }
    }, {})
