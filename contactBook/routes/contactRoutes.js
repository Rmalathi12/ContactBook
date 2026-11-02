const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.get("/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

router.post("/contacts", async (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email ? req.body.email : undefined,
  });
  const savedContact = await newContact.save();
  res.json(savedContact);
});

router.put("/contacts/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      },
      { new: true },
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "contact deleted" });
});

module.exports = router;
