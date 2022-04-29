const express = require('express');
const router = express.Router();
const layoutController = require("../controllers/layoutController");

router.get('/static', layoutController.static);
router.get('/sidenav-light', layoutController.sidenavLight);

module.exports = router;
