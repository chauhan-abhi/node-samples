/*
 *  handler --> is the route handler function
 *  return 
 * 
*/



module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res)
        } catch (ex) {
            next(ex)
        }
    }
}