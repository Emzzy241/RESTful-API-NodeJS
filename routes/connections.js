const express = require('express');
const router = express.Router();
const Connection = require('../models/connection');

router.get("/", async (req, res) => {
    try {
        const connection = await Connection.find();
        res.json(connection);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const connection = await Connection.findById(req.params.id);
        if (connection != null) {
            return res.json(connection);
        }
        return res.status(400).json({ message: "cannot find connection" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.post("/", async (req, res) => {
    try {
        const connection = new Connection({
            name: req.body.name,
            connectedToAccount: req.body.connectedToAccount
        });
        const newConnection = await connection.save();
        res.status(201).json(newConnection);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.patch("/:id", getConnection, async (req, res) => {
    const connection = await Connection.findById(req.params.id)

    if (req.body != null) {
        connection.name = req.body.name
    }
    if (req.body.connectedToAccount != null) {
        connection.connectedToAccount = req.body.connectedToAccount
    }

    try {
        const updatedConnection = await connection.save();
        res.json({ updatedConnection })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

async function getConnection(req, res, next) {
    let connection
    try {
        connection = await Connection.findById(req.params.id);
        if (connection == null) {
            return res.status(400).json({ message: "Connection not found" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.connection = connection
    next()
}




module.exports = router;