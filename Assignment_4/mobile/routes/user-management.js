var express = require("express");
var router = express.Router({
  caseSensitive: true,
});
var ensureToken = require("../../utilities/ensure-token.js");

/**
 *  User Login
 */
var userLoginCtrl = require("../controllers/car-management/login.js");
router.post("/login", function (req, res) {
  return userLoginCtrl.userLogin(req, res);
});

module.exports = router;
