// setup the envoerment 
require('dotenv').config({path:'./.env'});

//setup path module
const path = require('path')
//create and setup express
const express = require('express');
const app = express()
//router import
const router = require('./routes/app.routes');
//Set port 
const port = process.env.PORT
const connectDB = require('./DB/database.js')



//setup the middelware
app.set("view engine","ejs");
app.set("views",path.resolve("./src/views"))

// Error handling middleware (optional but useful)
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).send('Something went wrong!');
});


// Middleware to parse URL-encoded bodies (if applicable)
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//set up the db connection


//setup the router 
app.use('/',router)



connectDB()
.then(()=>{
//setup the list port for server running
app.listen(port,()=>{
    console.log(`The server run on http://localhost:${port}/`);
    
})
})
.catch((err)=>{
    console.log("Monngo Db EROR!! ",err);
    
})
