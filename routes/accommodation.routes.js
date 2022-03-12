const express = require("express");
const router = express.Router();
const Accommodation = require("../models/Accommodation.model");
const User = require("../models/User.model")
const mongoose = require('mongoose');

router.get("/:accommodationId", (req, res) => {
    Accommodation.findById(req.params.accommodationId)
        .then((accommodation) => res.json(accommodation))
        .catch((err) => res.json(err));
});

router.get("/", (req, res, next) => {
    Accommodation.find()
        .then((allaccommodations) => res.json(allaccommodations))
        .catch((err) => res.json(err));
});

router.post("/new/:userId/", (req, res, next) => {
    const { capacity, description, rooms } = req.body
    Accommodation.create({
        rooms: rooms,
        capacity: capacity,
        description: description,
        owner: req.params.userId
    })
        .then((newAccommodation) => {
            User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $push: { accommodations: newAccommodation._id } }
            )
            .catch((err) => res.json(err))
        })
        .then((newaccommodation) => res.json(newaccommodation))
        .catch((err) => res.json(err));
});

router.put("/:accommodationId", (req, res) => {
    Accommodation.findByIdAndUpdate(req.params.accommodationId, req.body, { new: true })
        .then((updatedaccommodation) => res.json(updatedaccommodation))
        .catch((err) => res.json(err));
});

module.exports = router;