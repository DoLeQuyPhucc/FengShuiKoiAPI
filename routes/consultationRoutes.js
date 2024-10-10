const express = require("express");
const router = express.Router();
const {
    getConsultationByElement,
} = require("../controllers/consultationController");

// Route to get consultation by element\
 router.get("/:date", getConsultationByElement);

module.exports = router;