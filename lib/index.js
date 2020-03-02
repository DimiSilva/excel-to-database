const selectDatabaseAndRunTransfer = async (databaseType, connectionString, spreadsheedPath) => {
    if (!databaseType || !connectionString || !spreadsheedPath) process.exit()

    const databaseTransferScript = databaseType.match(/^mongo/) ? require("./mongo_transfer_script") : process.exit()
    const transferResponse = await databaseTransferScript(connectionString, spreadsheedPath)

    console.log(transferResponse)
    process.exit()
}

module.exports = selectDatabaseAndRunTransfer
