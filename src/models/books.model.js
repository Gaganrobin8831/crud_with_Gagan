const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String},
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' } // Reference to User model
},{timestamps:true})

const Book = new mongoose.model('Book', bookSchema);

module.exports = Book;
