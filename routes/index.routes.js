const router = require("express").Router();
const authRoutes = require("./auth.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("Read the documentation.");
});

router.use("/auth", authRoutes);

module.exports = router;
