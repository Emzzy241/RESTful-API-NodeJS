
require("dotenv").config(); 
const express = require('express'); 
const app = express();  
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection

db.on("error", (error) => console.error(error)) 
db.once("open", () => console.log("Connected to Database")); 


app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use("/subscribers", subscribersRouter); // telling our app we want to use that route, and we want to use this whenever we query subscribers, the url looks like this: localhost:3000/subscribers

app.listen(3000, () => console.log(("Server started")));