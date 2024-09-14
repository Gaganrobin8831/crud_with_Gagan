const Author = require('../models/user.model'); 

const Book = require('../models/books.model'); 



async function deleteAuthor(req, res) {
    try {
        const authorId = req.params.id;

        // Find the author by ID
        const author = await Author.findById(authorId);

        if (!author) {
            return res.status(404).render('error', {
                message: 'Author not found',
                details: `Author with ID ${authorId} does not exist.`,
            });
        }

        // Remove the author's ID from the associated books
        await Book.updateMany(
            { user: authorId },
            { $unset: { user: "" } } // Remove the user reference
        );

        // Delete the author
        await Author.findByIdAndDelete(authorId);

        res.redirect('/showAuthor'); // Redirect to the authors list or another route
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the author.');
    }
}

module.exports = {
    deleteAuthor,
};