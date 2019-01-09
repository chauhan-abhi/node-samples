const config = require('config')

module.exports = function () {
    // pass name of application settings
    if (!config.get('jwtPrivateKey')) {
        // handled by winston error handling
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined')
    }
}