const winston = require('winston')

function initializeLogger(appInsightsClient) { 
    winston.configure({
        level: process.env.Environment == 'production' ? 'info' : 'debug', 
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
                maxsize: 5242880,
                maxFiles: 5,
            }),
            new winston.transports.File({
                filename: 'logs/combined.log',
                maxsize: 5242880,
                maxFiles: 5,
            }) 
        ],
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-DD-MM HH:mm:ss.SSS' }), 
            winston.format.json(),
        )
    })
    return winston
}
module.exports = {
    initializeLogger: initializeLogger
}