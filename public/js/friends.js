// /**
//  * Created by Jimmia Rowland on 5/14/17.
//  */

// $(document).ready(function() {
//   // Getting references to the name inout and friend container, as well as the table body
//   var nameInput = $("#friend-name");
//   var friendList = $("tbody");
//   var friendContainer = $(".friend-container");
//   // Adding event listeners to the form to create a new object, and the button to delete
//   // an Friend
//   $(document).on("submit", "#friend-form", handleFriendFormSubmit);
//   $(document).on("click", ".delete-friend", handleDeleteButtonPress);

//   // Getting the intiial list of Friends
//   getFriends();

//   // A function to handle what happens when the form is submitted to create a new Friend
//   function handleFriendFormSubmit(event) {
//     event.preventDefault();
//     // Don't do anything if the name fields hasn't been filled out
//     if (!nameInput.val().trim().trim()) {
//       return;
//     }
//     // Calling the upsertFriend function and passing in the value of the name input
//     upsertFriend({
//       name: nameInput
//         .val()
//         .trim()
//     });
//   }

//   // A function for creating an friend. Calls getFriends upon completion
//   function upsertFriend(friendData) {
//     $.post("/friends", friendData)
//       .then(getFriends);
//   }

//   // Function for creating a new list row for friends
//   function createFriendRow(friendData) {
//     var newTr = $("<tr>");
//     newTr.data("friend", friendData);
//     newTr.append("<td>" + friendData.name + "</td>");
//     newTr.append("<td><a style='cursor:pointer;color:red' class='delete-friend'>Delete Friend</a></td>");
//     return newTr;
//   }

//   // Function for retrieving friends and getting them ready to be rendered to the page
//   function getFriends() {
//     $.get("/friends", function(data) {
//       var rowsToAdd = [];
//       for (var i = 0; i < data.length; i++) {
//         rowsToAdd.push(createFriendRow(data[i]));
//       }
//       renderFriendList(rowsToAdd);
//       nameInput.val("");
//     });
//   }

//   // A function for rendering the list of friends to the page
//   function renderFriendList(rows) {
//     friendList.children().not(":last").remove();
//     friendContainer.children(".alert").remove();
//     if (rows.length) {
//       console.log(rows);
//       friendList.prepend(rows);
//     }
//     else {
//       renderEmpty();
//     }
//   }

//   // Function for handling what to render when there are no friends
//   function renderEmpty() {
//     var alertDiv = $("<div>");
//     alertDiv.addClass("alert alert-danger");
//     alertDiv.html("You must create a Friend before you can create a Post.");
//     friendContainer.append(alertDiv);
//   }

//   // Function for handling what happens when the delete button is pressed
//   function handleDeleteButtonPress() {
//     var listItemData = $(this).parent("td").parent("tr").data("friend");
//     var id = listItemData.id;
//     $.ajax({
//       method: "DELETE",
//       url: "/friends/"
//     })
//     .done(getFriends);
//   }
// });
