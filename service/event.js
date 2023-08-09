var express = require("express");
var router = express.Router();
require("dotenv").config();

const EventController = require("../controllers/EventController");
// Get Product List

router.get("/list", EventController.EventList);

// Get Specific Product

router.post("/add", EventController.addEvent);

// Add Product

module.exports = router;
