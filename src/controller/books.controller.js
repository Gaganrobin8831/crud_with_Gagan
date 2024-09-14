const Author = require('../models/user.model');
const book = require('../models/books.model');

async function HanleGet(req,res) {
    try {
        // Retrieve all users
        const users = await book.find();

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