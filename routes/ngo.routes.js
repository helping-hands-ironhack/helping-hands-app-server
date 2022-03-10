const express = require("express");
const router = express.Router();
const Ngo = require("../models/Ngo.model");

router.get("/", (req, res) => {
    Ngo.find()
        .then(allNgo => res.json(allNgo))
        .catch((error) => console.log(error))
});

router.post("/", (req, res) => {
    Ngo.create(req.body)
        .then(newNgo => res.json(newNgo))
        .catch((error) => console.log(error))
});

router.get("/:ngoId", (req, res) => {
    Ngo.findById(params.ngoId)
        .then(ngo => res.json(ngo))
        .catch((error) => console.log(error))
});

router.put("/:ngoId", (req, res) => {
    Ngo.findByIdAndUpdate(req.body, params.ngoId)
        .then(updatedNgo => res.json(updatedNgo))
        .catch((error) => console.log(error))
});

router.delete("/:ngoId", (req, res) => {
    Ngo.findByIdAndDelete(req.params.ngoId)
        .then((deletedNgo) => res.json(deletedNgo))
        .catch((error) => console.log(error))
});

module.exports = router;
