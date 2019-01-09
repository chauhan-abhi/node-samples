const winston = require('winston')

/**This middleware only catches errors in 
 * REQ PROCESSING PIPELINE --> particular to express
 * No error handling if outside the context of express
 */
module.exports = function (err, req, res, next) {
    // error handling logic
    // Log the exception
    // first atgument logging level--> error - warn -  info - verbose - debug -silly
    //winston.log('error', err.message)
    /***** OR *****/
    winston.error(err.message, err)
    res.status(500).send('Something went wrong')
}