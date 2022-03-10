const express = require("express");
const router = express.Router();
const Pax = require("../models/Pax.model");

router.post("/", (req, res) => {
    Pax.create(req.body)
        .then(newPax => res.json(newPax))
        .catch((error) => console.log(error))
});

router.get("/:paxId", (req, res) => {
    Pax.findById(params.paxId)
        .then(pax => res.json(pax))
        .catch((error) => console.log(error))
});

router.put("/:paxId", (req, res) => {
    Pax.findByIdAndUpdate(req.body, params.paxId)
        .then(updatedPax => res.json(updatedPax))
        .catch((error) => console.log(error))
});

router.delete("/:paxId", (req, res) => {
    Pax.findByIdAndDelete(req.params.paxId)
        .then((deletedPax) => res.json(deletedPax))
        .catch((error) => console.log(error))
});

module.exports = router;