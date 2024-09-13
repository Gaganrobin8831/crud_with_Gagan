const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true ,unique:true},
    email: { type: String, required: true, unique: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] // Array of references to Book model

},{timestamps:true})

const Author = new mongoose.model("Author",UserSchema)

module.exports= Author