/**
 * Created by Jimmia Rowland 
 */


// Dependencies
// =============================================================
var db = require("../models");
var express = require("express");
var friendRouter = express.Router();

friendRouter.get("/friends", function(req, res){
//This assumes that the user object is at req.user
//session object? Where is the user record?

	var user = req.user;
	if (user) {
    user.getFriends().then(friendsList => {
		//The list of associated friends.
		res.json(friendsList);
	});

	}else{
	res.status(400).json({
		"status" : "User is not logged in"
	}).redirect("/signin");

	}
});

friendRouter.post("/friends", function(req, res){

var user = req.user;
	if (user) {
	var name = req.body.name;
	db.Friend.create({
		name: name
	}).then(friend =>{
		return user.addFriend(friend);

	}).then(()=>{
		user.getFriends().then(friendsList => {
		//A friends' list is a list of associated friends.
		res.json(friendsList);
	});
	});	

	}else{
	res.status(400).json({
		"status" : "User is not logged in"
	}).redirect("/signin");

	}
});

friendRouter.post("/friends", function(req, res){

var user = req.user;
	if (user) {
	var id = req.body.id;
	db.Friend.findById(id).then(friend =>{
		if (friend){

		return user.removeFriend(friend).then(()=>{
		  return friend.destroy();

		});

		}

	}).then(()=>{
		user.getFriends().then(friendsList => {
		//A friends' list is a list of associated friends.
		res.json(friendsList);
	});
	});	



    

	}else{
	res.status(400).json({
		"status" : "User is not logged in"
	}).redirect("/signin");

	}
});