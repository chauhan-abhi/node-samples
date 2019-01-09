const winston = require('winston')
require('winston-mongodb')
require('express-async-errors') // this patches the same work that async.js middleware performs

module.exports = function () {
    //---------------------------------------------------------//

    // standard event --> raised in node process and not handled 
    // using catch block
    // this is neccesary because our error.js does not handle 
    // exceptions which are outside context of express
    /* *** but this works only with synchronous code
     and not on promise rejections(UNHANDLED PROMISE REJECTIONS) ******/
    //---------------------------------------------------------//
    /* process.on('uncaughtException', (ex) => {
         //console.log('WE GOT AN UNCAUGHT EXCPETION')
         winston.error(ex.message, ex)
         process.exit(1)
    })
    */
    /***********OR **************/
    // handle uncaughtExceptions and log them to File  
    winston.handleExceptions(
        new winston.transports.Console({ colorise: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }))

    //---------------------------------------------------------//
    // promise rejections(UNHANDLED PROMISE REJECTIONS)
    /* process.on('unhandledRejection', (ex) => {
        // console.log('WE GOT AN UNHANDLED REJECTION')
        winston.error(ex.message, ex)
        process.exit(1)
    }) */
    /*******OR **********/
    process.on('unhandledRejection', (ex) => {
        // winston will automatically catch this even after 
        // it doesnt supoort unhandledRejection by default
        throw ex
    })
    //---------------------------------------------------------//

    winston.add(winston.transports.File, { filename: 'logfile.log' })
    // logging to mongoDb
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly',
        level: 'info'  // only error will be logged
    })

}