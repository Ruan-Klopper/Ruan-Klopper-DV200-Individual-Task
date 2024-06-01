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

// Delete property by ID
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
      console.log("Property not found " + id);
    }

    res.status(200).json({ message: "Property deleted successfully" });
    console.log("Property deleted successfully");
  } catch (err) {
    res.status(500).json({ error: "Could not delete property" });
    console.log("error " + id);
  }
});

// Update property by ID
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const property = await Property.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: "Could not update property" });
  }
});

module.exports = router;
