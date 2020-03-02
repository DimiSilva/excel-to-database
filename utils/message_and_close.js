module.exports = (message, code = 1) => {
    console.error(message)
    console.warn(`process exit with code: ${code}`)
    process.exit(code)
}
