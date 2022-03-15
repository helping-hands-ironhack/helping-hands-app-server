const express = require("express");
const router = express.Router();
const Pax = require("../models/Pax.model");
const Ngo = require("../models/Ngo.model");

router.get("/", (req, res) => {
    Pax.find()
        .populate("ngo")
        .then(allPax => res.json(allPax))
        .catch((error) => console.log(error))
});

router.post("/create/:id", (req, res, next) => {
    const { adults, children } = req.body;
    Pax.create({
        adults: adults,
        children: children,
        ngo: req.params.id
    })
        .then((newPax) => {
            Ngo.findByIdAndUpdate(
                { _id: req.params.id },
                { $push: { paxToHost: newPax._id } }
            )
                .catch((err) => res.json(err))
        })
        .then((newpax) => res.json(newpax))
        .catch((err) => res.json(err));
});

router.get("/:paxId", (req, res) => {
    Pax.findById(req.params.paxId)
        .populate("ngo")
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