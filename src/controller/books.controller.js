const Author = require('../models/user.model');
const Book = require('../models/books.model');

async function HanleGet(req,res) {
    try {
   
               
        const users = await Book.find().populate('user');
        
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