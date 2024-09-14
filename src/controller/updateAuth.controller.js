const Author = require('../models/user.model'); // Assuming this is the Author model
const Book = require('../models/books.model'); // Assuming this is the Book model
// Get the author details to edit
async function getEditAuthor(req, res) {
    try {
        const authorId = req.params.id;
        const author = await Author.findById(authorId).populate('books');
        if (!author) {
            return res.status(404).render('error', {
                message: 'Author not found',
                details: `Author with ID ${authorId} does not exist.`,
            });
        }
        res.render('editAuthor', { author }); // Render the edit form (editAuthor.ejs)
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the author details.');
    }
}
// Update the author's details
async function updateAuthor(req, res) {
    try {
        const authorId = req.params.id;
        const { name, email } = req.body;
        const updatedAuthor = await Author.findByIdAndUpdate(
            authorId,
            { name, email },
            { new: true } // Return the updated document
        );
        if (!updatedAuthor) {
            return res.status(404).render('error', {
                message: 'Author not found',
                details: `Author with ID ${authorId} does not exist.`,
            });
        }
        res.redirect('/showAuthor'); // Redirect to the authors list or another route
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the author.');
    }
}
module.exports = {
    getEditAuthor,
    updateAuthor,
};