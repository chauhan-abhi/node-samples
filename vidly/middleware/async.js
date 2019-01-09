/*
 *  handler --> is the route handler function
 *  return 
 * 
*/

/**
 * --> the only parameter to this function is a reference to hanlder function
 * --> and not any req, res, ex objects
 * async function asyncMidelware(handler) {
 * template used
 *  try{
 *      await handler(req, res)         --> this handler needs two args : req,res
 *  } catch(ex) {
 *      next(ex)
 *  }
 * }
 */

/**
 * this is passed as handler in the argument to asyncMiddleware
 * async (req, res) => {
   const genres = await Genre.find().sort('name')
   res.send(genres);
   })
 */


// calling this function returns a function that is route handler
// which looks like this and express can call and pass req, res , next at runtime
/**
 *  router.get('/', (req,res, next) => {
 * }) 
 * */
module.exports = function asyncMiddleware(handler) {
    // here req, res, next are passed by express at runtime
    return async (req, res, next) => {
        try {
            await handler(req, res)
        } catch (ex) {
            next(ex)
        }
    }
}