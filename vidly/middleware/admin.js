module.exports = function(req, res, next) {
    // authorization middleware sends req.user
    // 401 Unauthorised
    // 403 Forbidden
    if(!req.user.isAdmin) return res.send(403).send('Access Denied')    
    next()  // route handler
}