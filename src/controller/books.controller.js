const Author = require('../models/user.model');
const Book = require('../models/books.model');

async function HanleGet(req,res) {
    try {
        // Retrieve all users
        // const users = await book.find();
               
        const users = await Book.find().populate('user');
         // This will populate the `books` array with book documents

        // Render the 'users' view with the list of users
        res.render('showBooks', { users });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', {
            message: 'An error occurred while retrieving users',
            details: err.message
        });
    }
}

module.exports = {HanleGet}