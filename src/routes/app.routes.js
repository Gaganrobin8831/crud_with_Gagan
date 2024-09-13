const express = require('express')
const { HandlePost } = require('../controller/user.controller')
const { HanleGet } = require('../controller/books.controller')
const { HanleUpdateToGet,HanleUpdate } = require('../controller/editBook.controller')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('user')
})

// show the table of books
router.get('/show',HanleGet)

//post route
router.post('/add',HandlePost);

//update route get and post
router.get('/edit/:id',HanleUpdateToGet);
router.post('/edit/:id',HanleUpdate);

module.exports = router