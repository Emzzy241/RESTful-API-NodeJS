// WHere we put all of our different server code
// nodemon ensures we never have to manually build and run our server everytime, its very similar to dotnet watch run

require("dotenv").config(); // Loads all our environment variables from our .env
const express = require('express');  // importing the express library
const app = express();  // creates an app variable that ewe can use to configure our server
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection

// Hooking up some events to run when our dataase is connected or if there is an error
db.on("error", (error) => console.error(error)) // seeing if there is a problem connecting to our dataabase
db.once("open", () => console.log("Connected to Database")); // Once we connect, we output a message to the console to verify



// Making our application do something


// Done with our database & our servers are listening for requests
// Next is create routes for our server and set up our server to accept JSON data

// app.use() will allow us to use any middleware we want, remember, a middleware is code that runs when the server gets a request
// But before it gets passed to your routes

// ow we want to use express.json() which lets our server accept a json.

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use("/subscribers", subscribersRouter); // telling our app we want to use that route, and we want to use this whenever we query subscribers, the url looks like this: localhost:3000/subscribers
// So now anything that this url: 'localhost:3000/subscribers'or anything after it like /new, it is going to go into the subscribers router that we created above
// Telling it we want to use the subscribers router anytime we get a request from the route /subscribers


app.listen(3000, () => console.log(("Server started")));