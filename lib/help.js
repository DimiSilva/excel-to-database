module.exports = () => {
    console.log(
        `
        Usage: excelTransfer [options]

        Options: 
            -h, --help                          print excelTransfer options (currently set)
            -v, --version                       print excelTransfer version
            -d, --database-type                 specifies database type, default is mongodb - avaible (mongodb) - more types in development
            -c, --connection-string             specifies connection string, this option is mandatory
            -s: --spreadsheet-path              specifies spreadsheet path, supported formats: xlsx
        `
    )
    return nextCommand => (nextCommand ? nextCommand() : undefined)
}
