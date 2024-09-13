const express = require('express')
const { HandlePost } = require('../controller/user.controller')
const { HanleGet } = require('../controller/books.controller')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('user')
})
router.get('/show',HanleGet)

router.post('/add',HandlePost);

module.exports = router