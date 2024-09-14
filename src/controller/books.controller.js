// const Author = require('../models/user.model');
// const Book = require('../models/books.model');

// async function HanleGet(req,res) {
//     try {
   
               
//         const users = await Book.find().populate('user');
        
//         res.render('showBooks', { users });
//     } catch (err) {
//         console.error(err);
//         res.status(500).render('error', {
//             message: 'An error occurred while retrieving users',
//             details: err.message
//         });
//     }
// }

// module.exports = {HanleGet}

const Book = require('../models/books.model');
const { ApiError } = require('../utilits/ApiError.utilitis'); // Adjust the path as necessary
const { ApiResponse } = require('../utilits/Apirespone.utilits'); // Adjust the path as necessary

async function HanleGet(req, res) {
    try {
        // Fetch books and populate user data
        const books = await Book.find().populate('user');

        // Create a successful response
        const response = new ApiResponse(true, 'Books retrieved successfully', books);

        // Send the successful response
        res.status(response.statusCode).render('showBooks', { users: response.data });
    } catch (err) {
        // Log the error
        console.error(err);

        // Create an error response
        const error = new ApiError(500, 'An error occurred while retrieving books', [err.message]);

        // Send the error response
        res.status(error.statusCode).render('error', {
            message: error.message,
            details: error.error.join(', ')
        });
    }
}

module.exports = { HanleGet };
