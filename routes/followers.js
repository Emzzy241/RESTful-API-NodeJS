const express = require('express');
const router = express.Router();
const Follower = require('../models/follower');

router.get("/", async (req, res) => {
    try {
        const followers = await Follower.find()
        res.json(followers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        let follower = await Follower.findById(req.params.id)
        if (follower == null) {
            return res.status(400).json({ message: "Cannot find follower" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.post("/", async (req, res) => {
    let follower = new Follower({
        name: req.body.name,
        followedToPage: req.body.followedToPage
    })
    try {
        const newFollower = await follower.save()
        return res.status(201).json(newFollower)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

// router.patch("/:id", async (req, res) => {
//     try {
//         let follower = await Follower.findById(req.params.id)
//         if (follower != null) {

//             if(req.body.name != null) {
//                 follower.name = req.body.name
//             }
//             if (req.body.followedToPage != null){
//                 follower.followedToPage = req.body.followedToPage
//             }
//             try {
//                 const updatedFollower = await follower.save()
//                 res.json({updatedFollower})
//             } catch (err) {
//                 res.status(400).json({ message: err.message })
//             }

//             // return res.status(400).json({ message: "Cannot find follower"});
//         }

//     }
//     catch (err) {
//         return res.status(500).json({ message: err.message })
//     }
// })


router.patch("/:id", getFollower, async (req, res) => {
    let follower = await Follower.findById(req.params.id)

    if (req.body.name != null) {
        follower.name = req.body.name
    }
    if (req.body.followedToPage != null) {
        follower.followedToPage = req.body.followedToPage
    }
    try {
        const updatedFollower = await follower.save()
        res.status(200).json({ updatedFollower })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete("/:id", getFollower, async (req, res) => {
    try {
        await Follower.deleteOne(res.follower)
        return res.json({message: "Follower has been delete"});
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

async function getFollower(req, res, next) {
    let follower
    try {
        follower = await Follower.findById(req.params.id)
        if (follower == null) {
            return res.status(400).json({ message: "Follower not found" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.follower = follower
    next()

}

module.exports = router;