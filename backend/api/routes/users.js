const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found." });
  }
  const isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  res.status(200).json({ message: "Login successful.", userId: existingUser._id });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found." });
  }
  if (!existingUser.isAdmin) {
    return res.status(403).json({ message: "Access Denied. Not an admin." });
  }
  const isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  res.status(200).json({ message: "Login successful.", userId: existingUser._id });
});

router.post("/admin/add", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin added successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: 'User deleted.' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  try {
    await User.updateOne({ _id: userId }, { $set: updateOps });
    res.status(200).json({ message: 'User updated.' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
