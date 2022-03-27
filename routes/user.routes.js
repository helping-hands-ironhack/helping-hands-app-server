const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Accommodation = require("../models/Accommodation.model");

router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId)
    .populate("accommodations")
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => res.json(err));
});

router.put("/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => res.json(err));
});

router.get("/", (req, res, next) => {
  User.find()
    .populate("accommodations")
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.json(err));
});

module.exports = router;