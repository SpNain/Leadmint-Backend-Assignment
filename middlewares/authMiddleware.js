const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Authentication failed." });
  }
};

module.exports = authenticate;
