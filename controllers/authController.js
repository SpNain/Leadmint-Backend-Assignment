const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendOtpEmail = require("../services/otpService");
const { generateToken } = require("../services/jwtService");

exports.signup = async (req, res) => {
  const { name, email, password, mobile, role } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      role,
      otp,
    });

    await sendOtpEmail(email, otp);

    res.status(201).json({ msg: "Signup successful. OTP sent to email." });
  } catch (err) {
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.json({ msg: "OTP verified. Account activated." });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "OTP verification failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.isVerified) return res.status(401).json({ msg: "Account not verified. Please verify OTP first." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Incorrect password" });

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
};
