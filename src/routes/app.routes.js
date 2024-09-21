const express = require('express')
const { HandlePost } = require('../controller/user.controller')
const { HanleGet } = require('../controller/books.controller')
const { HanleUpdateToGet,HanleUpdate,handleDelete } = require('../controller/editBook.controller')
const { HanleGetAuth } = require('../controller/auhor.controller')
const { getEditAuthor,updateAuthor } = require('../controller/updateAuth.controller')
const { deleteAuthor } = require('../controller/delAuth.controller')
const { asyncHandler } = require('../utilits/async.utitilty')
const router = express.Router()




router.get('/', asyncHandler((req, res) => {
    res.render('user');
}));

router.get('/show', async (req, res) => {
    // Example response
    res.json({ message: "List of books" });
});




router.get('/showAuthor',HanleGetAuth)

router.get('/editAuth/:id',getEditAuthor)

router.post('/editAuth/:id',updateAuthor)


//post route
router.post('/add',HandlePost);

//update route get and post
router.get('/edit/:id',HanleUpdateToGet);

router.post('/update/:id',HanleUpdate);

router.get('/del/:id',handleDelete);

router.get('/delAuth/:id',deleteAuthor);

module.exports = router