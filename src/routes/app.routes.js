const express = require('express')
const { HandlePost } = require('../controller/user.controller')
const { HanleGet } = require('../controller/books.controller')
const { HanleUpdateToGet,HanleUpdate,handleDelete } = require('../controller/editBook.controller')
const { HanleGetAuth } = require('../controller/auhor.controller')
const { getEditAuthor,updateAuthor } = require('../controller/updateAuth.controller')
const { deleteAuthor } = require('../controller/delAuth.controller')
const router = express.Router()



/**
 * @swagger
 * /:
 *  get:
 *      summary: Returns a form for entering data
 *      description: Returns a form for entering data
 *      responses:
 *            200:
 *                description: A successful response
 */
router.get('/', (req, res) => {
    res.render('user');
});

/**
 * @swagger
 * /show:
 *   get:
 *     summary: Retrieve a list of books
 *     responses:
 *       200:
 *         description: A list of books retrieved successfully
 */
router.get('/show', async (req, res) => {
    // Example response
    res.json({ message: "List of books" });
});





// // show the table of books
// router.get('/show',HanleGet)

// show the table of Author
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