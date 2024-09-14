const Author = require('../models/user.model');
const Book = require('../models/books.model');

async function HanleGetAuth(req, res) {
    try {
       
        const users = await Author.find().populate('books');
         // This will populate the `books` array with book documents
  
        
        res.render('showAuthor', { users }); 
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching authors.');
    }
}




module.exports = { HanleGetAuth }