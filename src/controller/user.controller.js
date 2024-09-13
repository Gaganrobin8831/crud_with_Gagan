const Author = require('../models/user.model');
const Book = require('../models/books.model');

async function HandlePost(req, res) {
    try {
        console.log('Request Body:', req.body); // Debugging line
        const { authorname, email, title } = req.body;
        console.log({ authorname, email, title });

        // Create a new user and book
        const user = new Author({ name: authorname, email });

        const books = title.map(title => ({ title}));
        const result = await Book.insertMany(books);

   
       
            // Save the user and book to the database
            await user.save(); // Save user first
          
      


        // Redirect to the route that shows all users
        console.log("User and book saved successfully");

        res.redirect('/show'); // Redirect or send a success response 
    } catch (err) {
        console.error(err);

        // Render error.ejs with the error message and details
        let errorMessage = 'An error occurred while creating the user';
        let errorDetails = '';

        if (err.name === 'ValidationError') {
            errorMessage = 'Validation Error';
            errorDetails = Object.values(err.errors).map(e => e.message).join(', ');
        } else if (err.code && err.code === 11000) {
            // Handle unique constraint errors
            errorMessage = 'Duplicate key error';
            errorDetails = `Duplicate value for fields: ${Object.keys(err.keyValue).join(', ')} - ${Object.values(err.keyValue).join(', ')}`;
        } else {
            errorMessage = err.message;
        }

        res.status(500).render('error', {
            message: errorMessage,
            details: errorDetails || null
        });
    }
}





module.exports = { HandlePost }