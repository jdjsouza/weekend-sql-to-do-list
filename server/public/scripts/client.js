$(document).ready(onReady);

function onReady() {
  $('.js-btn-submit').on('click', addTask);
  $('.js-output-list').on('click', '.js-btn-complete', updateList);
  $('.js-output-list').on('click', '.js-btn-delete', deleteTask);

  getToDoList();
}

function getToDoList() {
  console.log('In getToDoList');
  // get the list from the server
  $.ajax({
    method: 'GET',
    url: '/tasks',
  })
    .then(function (response) {
      console.log('GET response', response);
      // display to do list on the page
      renderList(response);
    })
    .catch(function (error) {
      console.log('GET error', error);
      alert('Failed to GET');
    });
}

function updateList() {
  // update the status when marked as completed
  const id = $(this).data('id');
  $.ajax({
    method: 'PUT',
    url: `/tasks/update/${id}`,
    data: { completed: true },
  })
    .then((response) => {
      // get the updated list from the db
      getToDoList();
    })
    .catch((err) => {
      console.log(err);
      alert('Failed to updated completed status.');
    });
}

function addTask() {
  // add new task to the db
  const taskToSend = {
    task: $('.js-input-task').val(),
    completed: false,
  };
  console.log('in Add Task', taskToSend);
  // POST to DB
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: taskToSend,
  })
    .then(function (response) {
      // get the updated list from the db
      getToDoList();
    })
    .catch((err) => {
      console.log(err);
      alert('Failed to POST');
    });
}

function deleteTask() {
  // delete a task from the db
  const id = $(this).data('id');
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${id}`,
  })
    .then((response) => {
      console.log('In delete', response);
      // get the updated list from the db
      getToDoList();
    })
    .catch((err) => {
      console.log(err);
      alert('Deletion Failed');
    });
}

function renderList(theList) {
  $('.js-output-list').empty();
  // display todo list
  for (let todo of theList) {
    if (todo.completed === true) {
      $('.js-output-list').append(
        `<li class="complete">${todo.task} 
            <button class="btnList js-btn-delete" data-id="${todo.id}">Delete</button></li>`
      );
    } else {
      $('.js-output-list').append(
        `<li>${todo.task} 
            <button class="btnList js-btn-complete" data-status="${todo.completed}"data-id="${todo.id}">Complete Task</button>
            <button class="btnList js-btn-delete" data-id="${todo.id}">Delete</button></li>`
      );
    }
  }
}
