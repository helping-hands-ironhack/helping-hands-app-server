const router = require("express").Router();
const jwt = require("jsonwebtoken");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

const Ngo = require("../models/Ngo.model")

const {isAuthenticated} = require("../middleware/jwt.middleware")


router.post("/signup", (req, res) => {
  const { password, name, cif, email, description } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your email." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  Ngo.findOne({ email }).then((found) => {
    if (found) {
      return res.status(400).json({ errorMessage: "Email already taken." });
    }

    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return Ngo.create({
          password: hashedPassword,
          name: name,
          cif: cif,
          email: email,
          description: description
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "Name need to be unique. The name you chose is already in use.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your email." })
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  Ngo.findOne({ email })
    .then((ngo) => {
      if (!email) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }

      bcrypt.compare(password, ngo.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong password." });
        }
        else {
          const { _id, email, firstName } = ngo;

          const payload = { _id, email, firstName };

          const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: 'HS256', expiresIn: "6h" }
          );

          res.status(200).json({ authToken: authToken });

        }

        // Session.create({ user: user._id, createdAt: Date.now() }).then(
        //   (session) => {
        //     return res.json({ user, accessToken: session._id });
        //   }
        // );
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.get('/verify', isAuthenticated, (req, res, next) => {       // <== CREATE NEW ROUTE
 
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
 
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});
 

router.delete("/logout", (req, res) => {
  Session.findByIdAndDelete(req.headers.authorization)
    .then(() => {
      res.status(200).json({ message: "User was logged out" });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;