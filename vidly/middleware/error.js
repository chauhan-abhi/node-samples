module.exports = function (err, req, res, next) {
    // error handling logic
    // Log the exception
    res.status(500).send('Something went wrong')
}