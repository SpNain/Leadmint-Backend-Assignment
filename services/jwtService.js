const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "4h" }
  );
};

module.exports = { generateToken };
