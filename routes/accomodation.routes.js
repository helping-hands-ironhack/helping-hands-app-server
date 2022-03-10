const express = require("express");
const router = express.Router();
const Accommodation = require("../models/Accommodation.model");
const mongoose = require('mongoose');

router.get("/:accomodationId", (req, res) => {
    Accommodation.findById(req.params.accomodationId)
        .then((accomodation) => res.json(accomodation))
        .catch((err) => res.json(err));
});

router.get("/accomodations", (req, res, next) => {
    Accommodation.find()
        .then((allAccomodations) => res.json(allAccomodations))
        .catch((err) => res.json(err));
});

router.post("/accomodations", (req, res, next) => {
    Accommodation.create(req.body)
        .then((newAccomodation) => res.json(newAccomodation))
        .catch((err) => res.json(err));
});

router.put("/:accomodationId", (req, res) => {
    Accommodation.findByIdAndUpdate(req.params.accomodationId, req.body, { new: true })
        .then((updatedAccomodation) => res.json(updatedAccomodation))
        .catch((err) => res.json(err));
});
