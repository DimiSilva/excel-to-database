#!/usr/bin/env node
const FS = require("fs")
const Path = require("path")
const Minimist = require("minimist")

const Package = require("../lib/index")
const Help = require("../lib/help")
const Version = require("../lib/version")
const messageAndClose = require("../utils/message_and_close")

const avaibleDatabaseTypes = [/^mongo/]

const startup = async () => {
    const args = getArguments()
    await readAndTreatArguments(args)
}

const getArguments = () =>
    Minimist(
        process.argv.slice(2).map(arg => arg.toLowerCase()),
        {
            alias: {
                h: "help",
                v: "version",
                d: "database-type",
                c: "connection-string",
                s: "spreadsheet-path",
            },
        }
    )

const readAndTreatArguments = async args => {
    if (!args) messageAndClose("invalid arguments", 9)

    if (args.help) Help()(process.exit())
    if (args.version) Version()(process.exit())

    chackDatabaseType(args["database-type"])
    checkConnectionString(args["connection-string"])
    checkSpreadsheetPath(args["spreadsheet-path"])

    await Package(args["database-type"], args["connection-string"], args["spreadsheet-path"])
}

const chackDatabaseType = type =>
    !type ||
    typeof type !== "string" ||
    (!avaibleDatabaseTypes.find(avalibleType => type.match(avalibleType)) && messageAndClose("invalid database type", 9))

const checkConnectionString = connectionString =>
    (!connectionString || typeof connectionString != "string") && messageAndClose("invalid connection string", 9)

const checkSpreadsheetPath = path =>
    (!path || !FS.existsSync(path) || Path.extname(path).replace(/\./g, "") !== "xlsx") && messageAndClose("invalid spreadsheet path", 9)

startup()
