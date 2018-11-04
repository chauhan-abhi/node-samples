const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('index', {title: 'Express Demo App', message: 'Hi'})
    //res.send('Express response')    
})

module.exports = router