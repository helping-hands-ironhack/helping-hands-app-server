const router = require("express").Router();
const authRoutes = require("./auth.routes");
const authNgoRoutes = require("./auth.routes.ngo")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/auth/ngo", authNgoRoutes)

module.exports = router;
