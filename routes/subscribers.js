// Must match name in server

const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Since its a RESTful API, we'll be using RESTFUL endpoints

// Getting all subscribers
router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find() //gets all the different subscribers
        res.json(subscribers);
    } catch (error) {
        // sending that error as a json because this is a json api
        res.status(500).json({ message: err.message });
    }
})
// Getting one subscriber
router.get("/:id", getSubscriber, (req, res) => {
    res.json(res.subscriber) //Now after testing and confirming, we just send a json version of that subscriber

    // To use the getSubscriber middleware like we did above, put the name of the middleware before the actual function, do not call it, just put the name there.... And that is your entire middleware setup
    // id above is a parameter and we can access it using; req.params.id
    // res.send(res.subscriber.name); // this gets the name of the subscriber since we have the middleware and send it back to us... JUST FOR TESTING PURPOSE
})
// Creating one
router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
    }) // We are essentially creating an instance of the Subscriber object and it must follow this particular pattern (2 required keys; name & subscribedToChannel)

    // saving it now, here the asynchronous part now comes in
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err){
        // Sending 400 because, our subscriber snippet of code will fail if user does not pass in the name or subscribed channel, hence the fault is now from user. 
        // So if user sends Bad data, it fails, and whenever user gives you bad data you want to send 400 because it means there is something wrong with user input and not something wrong with your server.

        res.status(400).json({ message: err.message });
    }
})
// Updating one
router.patch("/:id", getSubscriber, async (req, res) => {
    // Used patch instead of put for our update, because we only want to update what the user passes us, unlike PUt which will update all the information of the subscriber all at once instead of that specific name
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json({updatedSubscriber})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})
// Deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({ message: "Deleted Subscriber" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSubscriber (req, res, next)
{
    let subscriber
    // next says if we call this function, move on to the next section of our code which is the callback in delete, or update or any other place we want to find data
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null)
        {
            return res.status(404).json( { message: "Cannot find subscriber"} )
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    // A variable we create on the response object, thanks to this, 
    // inside the other functions (delete, patch), we can just call res.subscriber which is going to be the subscriber we set down here

    res.subscriber = subscriber
    next()
    // next() here we allow us to move on to the next piece of middleware or the actual request itself

}

module.exports = router;