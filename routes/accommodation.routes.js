const express = require("express");
const router = express.Router();
const Accommodation = require("../models/Accommodation.model");
const User = require("../models/User.model")
const mongoose = require('mongoose');

const fileUploader = require("../config/cloudinary.config");
const Pax = require("../models/Pax.model");

router.get("/:accommodationId", (req, res) => {
    Accommodation.findById(req.params.accommodationId)
        .populate("owner")
        .populate("requests")
        .then((accommodation) => res.json(accommodation))
        .catch((err) => res.json(err));
});

router.delete("/:accommodationId", (req, res) => {
    Accommodation.findByIdAndDelete(req.params.accommodationId)
        .populate("requests")
        .then((accommodation) => res.json(accommodation))
        .catch((err) => res.json(err));
});

router.get("/", (req, res, next) => {
    Accommodation.find()
        .populate("owner")
        .then((allaccommodations) =>{
            console.log(allaccommodations)
            res.json(allaccommodations)})
        .catch((err) => res.json(err));
});

router.get("/findByUser/:id", (req, res) => {
    Accommodation.find(
        {
            'owner': `${req.params.id}`, 
            'requests.0': {
              '$exists': true
            }
        }
    )
        .then((accommodations) => res.json(accommodations))
        .catch((err) => res.json(err));
})

router.put("/:accommodationId/push-request/:paxId", (req, res) => {
    Accommodation.findByIdAndUpdate(
        req.params.accommodationId,
        { $push: { requests: req.params.paxId } },
        { new: true }
    )
        .then((results) => {
            Pax.findByIdAndUpdate(req.params.paxId, {
                $set: { isRequested: true }
            })
                .then(__ => res.json(results))

        })
        .catch((err) => res.json(err))
})


router.post("/new/:userId/", (req, res, next) => {
    const { capacity, description, rooms, imageUrl } = req.body


    Accommodation.create({
        rooms: rooms,
        capacity: capacity,
        description: description,
        owner: req.params.userId,
        imageUrl: imageUrl
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