const router = require("express").Router();
const jwt = require("jsonwebtoken");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Session = require("../models/Session.model");
const Ngo = require("../models/Ngo.model")

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const {isAuthenticated} = require("../middleware/jwt.middleware");

router.get("/session", (req, res) => {
  // we dont want to throw an error, and just maintain the user as null
  if (!req.headers.authorization) {
    return res.json(null);
  }

  // accessToken is being sent on every request in the headers
  const accessToken = req.headers.authorization;

  Session.findById(accessToken)
    .populate("user")
    .then((session) => {
      if (!session) {
        return res.status(404).json({ errorMessage: "Session does not exist" });
      }
      return res.status(200).json(session);
    });
});

router.post("/signup", isLoggedOut, (req, res) => {
  const { password, firstName, lastName, email } = req.body;

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

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

  // Search the database for a user with the username submitted in the form
  User.findOne({ email }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: "Email already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          password: hashedPassword,
          lastName: lastName,
          firstName: firstName,
          email: email,
        });
      })
      .then((user) => {
        Session.create({
          user: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          res.status(201).json({ user, accessToken: session._id });
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "Username need to be unique. The username you chose is already in use.",
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

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        Ngo.findOne({ email })
          .then((ngo) => {
            if (!email) {
              return res.status(400).json({ errorMessage: "Wrong credentials." })
            }
            bcrypt.compare(password, ngo.password).then((isSamePassword) => {
              if (!isSamePassword) {
                return res.status(400).json({ errorMessage: "Wrong password." });
              }
              else {
                const { _id, email, firstName, isNgo } = ngo;

                const payload = { _id, email, firstName, isNgo};

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
      }

      else {
        bcrypt.compare(password, user.password).then((isSamePassword) => {
          if (!isSamePassword) {
            return res.status(400).json({ errorMessage: "Wrong password." });
          }
          else {
            const { _id, email, firstName, isNgo } = user;

            const payload = { _id, email, firstName, isNgo };

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
        })
      };
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
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});


router.delete("/logout", isLoggedIn, (req, res) => {
  Session.findByIdAndDelete(req.headers.authorization)
    .then(() => {
      res.status(200).json({ message: "User was logged out" });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;