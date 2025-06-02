
require("dotenv").config(); 
const subscribersRouter = require('./routes/subscribers');
const followersRoute = require('./routes/followers');
const connectionsRoute = require('./routes/connections');
const express = require('express'); 
const app = express();  
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection

db.on("error", (error) => console.error(error)) 
db.once("open", () => console.log("Connected to Database")); 


app.use(express.json());


app.use("/subscribers", subscribersRouter); 
app.use("/followers", followersRoute);
app.use("/connections", connectionsRoute);
app.listen(3000, () => console.log(("Server started")));