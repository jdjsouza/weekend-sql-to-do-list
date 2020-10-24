$(document).ready(onReady);

function onReady() {
  $('.js-btn-submit').on('click', addTask);
}

function addTask() {
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
      // GET function here
    })
    .catch((err) => {
      console.log(err);
      alert('Failed to POST');
    });
}
