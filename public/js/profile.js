$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var newItemInput = $("input.new-item");
  // Our new todos will go inside the todoContainer
  var todoContainer = $(".todo-container");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", "button.delete", deleteTodo);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".todo-item", editTodo);
  $(document).on("keyup", ".todo-item", finishEdit);
  $(document).on("blur", ".todo-item", cancelEdit);
  $(document).on("submit", "#todo-form", insertTodo);

  // Our initial todos array
  var todos;

  // Getting todos from database when page loads
  getTodos();

  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    todoContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < todos.length; i++) {
      rowsToAdd.push(createNewRow(todos[i]));
    }
    todoContainer.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getTodos() {
    $.get("/api/todos", function(data) {
      console.log("Todos", data);
      todos = data;
      initializeRows();
    });
  }

  // This function deletes a todo when the user clicks the delete button
  function deleteTodo() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/todos/" + id
    })
    .done(function() {
      getTodos();
    });
  }

  // This function sets a todos complete attribute to the opposite of what it is
  // and then runs the updateTodo function
  function toggleComplete() {
    var todo = $(this)
      .parent()
      .data("todo");

    todo.complete = !todo.complete;
    updateTodo(todo);
  }

  // This function handles showing the input box for a user to edit a todo
  function editTodo() {
    var currentTodo = $(this).data("todo");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentTodo.text);
    $(this)
      .children("input.edit")
      .show();
    $(this)
      .children("input.edit")
      .focus();
  }

  // This function starts updating a todo in the database if a user hits the
  // "Enter Key" While in edit mode
  function finishEdit(event) {
    var updatedTodo;
    if (event.key === "Enter") {
      updatedTodo = {
        id: $(this)
          .data("todo")
          .id,
        text: $(this)
          .children("input")
          .val()
          .trim()
      };
      $(this).blur();
      updateTodo(updatedTodo);
    }
  }

  // This function updates a todo in our database
  function updateTodo(todo) {
    $.ajax({
      method: "PUT",
      url: "/api/todos",
      data: todo
    })
    .done(function() {
      getTodos();
    });
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentTodo = $(this).data("todo");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentTodo.text);
    $(this)
      .children("span")
      .show();
    $(this)
      .children("button")
      .show();
  }

  // This function constructs a todo-item row
  function createNewRow(todo) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item todo-item");
    var newTodoSpan = $("<span>");
    newTodoSpan.text(todo.text);
    newInputRow.append(newTodoSpan);
    var newTodoInput = $("<input>");
    newTodoInput.attr("type", "text");
    newTodoInput.addClass("edit");
    newTodoInput.css("display", "none");
    newInputRow.append(newTodoInput);
    var newDeleteBtn = $("<button>");
    newDeleteBtn.addClass("delete button is-primary");
    newDeleteBtn.text("x");
    newDeleteBtn.data("id", todo.id);
    var newCompleteBtn = $("<button>");
    newCompleteBtn.addClass("complete button is-primary");
    newCompleteBtn.text("✓");
    newInputRow.append(newDeleteBtn);
    newInputRow.append(newCompleteBtn);
    newInputRow.data("todo", todo);
    if (todo.complete) {
      newTodoSpan.css("text-decoration", "line-through");
    }
    return newInputRow;
  }

  // This function inserts a new todo into our database and then updates the view
  function insertTodo(event) {
    event.preventDefault();
    // if (!newItemInput.val().trim()) {   return; }
    var todo = {
      text: newItemInput
        .val()
        .trim(),
      complete: false
    };

    // Posting the new todo, calling getTodos when done
    $.post("/api/todos", todo, function() {
      getTodos();
    });
    newItemInput.val("");
  }

});

//Friends list creation/deletion

$(document).ready(function() {
  // Getting references to the name inout and author container, as well as the table body
  var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#author-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the intiial list of Authors
  getAuthors();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertAuthor({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertAuthor(authorData) {
    $.post("/api/authors", authorData)
      .then(getAuthors);
  }

  // Function for creating a new list row for authors
  function createAuthorRow(authorData) {
    var newTr = $("<tr>");
    newTr.data("author", authorData);
    newTr.append("<td>" + authorData.name + "</td>");
    newTr.append("<td> " + authorData.Posts.length + "</td>");
    newTr.append("<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getAuthors() {
    $.get("/api/authors", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderAuthorList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.html("You must create an Author before you can create a Post.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/authors/" + id
    })
    .done(getAuthors);
  }
});
