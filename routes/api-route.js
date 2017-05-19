// /**
//  * Created by Heidi on 5/14/17.
//  */

// // Dependencies
// // =============================================================
// var db = require("../models");
// var bcrypt = require("bcrypt");
// var jwt = require("jsonwebtoken");
// var express = require("express");
// var apiRouter = express.Router();

// var salt = "$2a$10$3gjukvyr28SWo6h01iHGJu9xURm2yVuA64KbHH";

// apiRouter.get("/test", function(req, res) {
//   res.status(200).json({ "message": "Success"})
// });



// // POST route for creating a new user
// // =============================================================
// apiRouter.post("/user", function(req, res) {
// 	 bcrypt.hash(req.body.password, salt, function(err, hash) {
// 	    db.User.create({
// 	      username: req.body.username,
//         email: req.body.email,
// 	      password: hash
// 	    })
// 	      .then(function(dbPost) {
// 	        res.status(200).json({"status": "Success"});
// 	      })
// 	      .catch(function (err) {
// 	        res.status(500).send(err);
// 	      })
// 	  });

// });



// // POST route for validating sign in
// // =============================================================
// apiRouter.post("/user/signin", function(req, res) {
//   db.User.findOne({
//     username: req.body.username
//   })
//     .then(function(user) {
//       if (!user) {
//         console.log("No user found")
//         res.status(400).json({
//           "status" : "Invalid username or password"
//         }).redirect("/signin");
//       } else {
//         bcrypt.compare(req.body.password, user.password, function(err, valid) {
//           if (err || !valid) {
//             res.status(400).json({
//               "status" : "Invalid username or password"
//             }).redirect("/signin");
//           } else {
//             var userToken = jwt.sign({
//               exp: Math.floor(Date.now() / 1000) + (60 * 60),
//               data: user.id
//             }, "randomsecretforsigningjwt");
//             res.status(200).json({
//               id: user.id,
//               username: user.username,
//               token: userToken
//             });
//           }
//         });
//       }
//     });
// });


// // Get route for log out
// // =============================================================
// apiRouter.get("/user/logout", function(req, res, next) {
//   req.session.destroy();
//   res.redirect("/user");
// });


// // Routes
// // =============================================================
// module.exports = apiRouter;