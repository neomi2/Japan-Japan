import fs from "fs";

export function printToLog(req, res, next) {
    fs.appendFileSync("log.txt", `--> ${new Date().toLocaleDateString()} - ${req.method} - ${req.url}\n`)
    next()
}