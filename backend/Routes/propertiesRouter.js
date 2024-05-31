const express = require("express");
const router = express.Router();

const Property = require("../Models/Property"); // Ensure the path to the Property model is correct

// Create new property
router.post("/add", async (req, res) => {
  const {
    houseName,
    houseDescription,
    rooms,
    location,
    price,
    image,
    rating,
    onShow,
  } = req.body;

  try {
    const property = new Property({
      houseName,
      houseDescription,
      rooms,
      location,
      price,
      image,
      rating,
      onShow,
    });
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch properties" });
  }
});

module.exports = router;
