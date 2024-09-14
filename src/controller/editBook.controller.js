const book = require('../models/books.model');
const Author = require('../models/user.model');

async function HanleUpdateToGet(req,res) {
    try {
        // Retrieve all users
        const id = req.params.id;
        console.log({id});
        const users = await book.findById(id);
        console.log(users);
        
        // Render the 'users' view with the list of users
        res.render('update', { users });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', {
            message: 'An error occurred while retrieving users',
            details: err.message
        });
    }

    
}

async function HanleUpdate(req, res) {
    console.log('Update request received');

    try {
        const bookId = req.params.id;  // The book ID from the request parameters
        const authorName = req.body.author;  // The author name from the form input

        // Find the author by name (you can adjust to use a different field if needed)
        const author = await Author.findOne({ name: authorName });
     
        
        
        if (!author) {
            return res.status(404).render('error', {
                message: 'Author not found',
                details: `Author with name ${authorName} does not exist.`
            });
        }

        // Update the book to assign the author
        const updatedBook = await book.findByIdAndUpdate(
            bookId,
            { user: author._id },  // Reference the author's ObjectId in the `user` field of the book
            { new: true }  // Return the updated document
        );

        if (!updatedBook) {
            return res.status(404).render('error', {
                message: 'Book not found',
                details: `Book with ID ${bookId} does not exist.`
            });
        }

        // Push the book ID to the author's books array
        author.books.push(bookId);
        await author.save();

        // Redirect to a route or render a success message
        res.redirect('/show');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', {
            message: 'An error occurred while updating the book and author',
            details: err.message
        });
    }
}


async function handleDelete(req, res) {
    console.log('Delete request received');
    try {
        // Convert the book ID to an ObjectId
        const bookId = req.params.id // Convert to ObjectId
        // Find the book by ID
        const Book = await book.findById(bookId);
        if (!Book) {
            return res.status(404).render('error', {
                Book: 'Book not found',
                details: `Book with ID ${bookId} does not exist.`
            });
        }
        // Debug: Log the book and author details
        console.log('Book to delete:', Book);
        // Find the author and remove the book reference from their `books` array
        if (Book.user) {
            // // Log the author's current state before the update
            // const authorBeforeUpdate = await Author.findById(Book.user);
            // console.log('Author before update:', authorBeforeUpdate);
            // console.log('Book ID to pull:', bookId);
            // // Perform the update operation
            const updateResult = await Author.findByIdAndUpdate(
                Book.user,
                { $pull: { books: bookId } },  // Remove the bookId from the author's `books` array
                { new: true } // Option to return the updated document
            );
            // Log the result of the update operation
            console.log('Update result:', updateResult);
            // Log the author's state after the update
            const authorAfterUpdate = await Author.findById(book.user);
            console.log('Author after update:', authorAfterUpdate);
        }
        // Delete the book
        await book.findByIdAndDelete(bookId);
        // Redirect to a route or render a success message
        res.redirect('/show');
    } catch (err) {
        console.error(err);
        res.status(500).render('error', {
            message: 'An error occurred while deleting the book',
            details: err.message
        });
    }
}

module.exports = {HanleUpdateToGet,HanleUpdate,handleDelete}