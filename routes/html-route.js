// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });
  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/register.html"));
  });
  app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/signin.html"));
  });
  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/profile.html"));
  });

};