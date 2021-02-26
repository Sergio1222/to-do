

$(document).ready(function () {

    var id_todo_list = +$('.container').attr('id');
    var taskInput = document.getElementById("new-task");
    var addButton = document.getElementsByTagName("button")[0];
    var incompleteTaskHolder = document.getElementById("incomplete-tasks");
    var completedTasksHolder = document.getElementById("completed-tasks");

    taskManager('getActiveTasks', { todo_list_id: id_todo_list }, function (id, descriptiopn) {
        var listItem = createNewTaskElement(descriptiopn, `${id}`);

        incompleteTaskHolder.appendChild(listItem);

        bindTaskEvents(listItem, taskCompleted);
    });

    taskManager('getCompletedTasks', { todo_list_id: id_todo_list }, function (id, descriptiopn) {
        var listItem = createNewTaskElement(descriptiopn, `${id}`, false);

        completedTasksHolder.appendChild(listItem);

        bindTaskEvents(listItem, taskIncomplete);
    });

    var createNewTaskElement = function (taskString, id = '', status = true) {

        var listItem = document.createElement("li");

        listItem.setAttribute("id", id);

        var checkBox = document.createElement("input");

        var label = document.createElement("label");

        var editInput = document.createElement("input");

        var editButton = document.createElement("button");

        var deleteButton = document.createElement("button");

        label.innerText = taskString;

        checkBox.type = "checkbox";

        if (!status) checkBox.setAttribute('checked', 'checked');

        editInput.type = "text";

        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        return listItem;
    }

    var addTask = function () {
        console.log("Add Task");

        if (taskInput.value && taskInput.value.length > 5) {
            taskManager('saveTask', { task_description: taskInput.value, todo_list_id: id_todo_list }, function (id, descriptiopn) {

                var listItem = createNewTaskElement(descriptiopn, `${id}`);
                incompleteTaskHolder.appendChild(listItem);

                bindTaskEvents(listItem, taskCompleted);
            });

            taskInput.value = '';
        }
        else {
            alert('Type more than 5 elements');
        }
    }

    var editTask = function () {
        console.log("Edit Task");
        console.log("Change 'edit' to 'save'");

        debugger;
        var listItem = this.parentNode;

        var editInput = listItem.querySelector('input[type=text]');
        var label = listItem.querySelector("label");
        var containsClass = listItem.classList.contains("editMode");

        if (containsClass) {
            label.innerText = editInput.value;

            taskManager('updateTasks', { task_id: listItem.id, task_description: editInput.value, todo_list_id: id_todo_list });
        }
        else {
            editInput.value = label.innerText;
        }

        listItem.classList.toggle("editMode");
    }

    var deleteTask = function () {
        console.log("Delete Task");

        var listItem = this.parentNode;
        var ul = listItem.parentNode;

        ul.removeChild(listItem);
        taskManager('deleteTask', { task_id: listItem.id, todo_list_id: id_todo_list });
    }

    var taskCompleted = function () {
        console.log("Complete Task");

        var listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);
        taskManager('updateStatusTasks', { task_id: listItem.id, status: 0, todo_list_id: id_todo_list });
        bindTaskEvents(listItem, taskIncomplete);
    }

    var taskIncomplete = function () {
        console.log("Incomplete Task");

        var listItem = this.parentNode;
        incompleteTaskHolder.appendChild(listItem);
        taskManager('updateStatusTasks', { task_id: listItem.id, status: 1, todo_list_id: id_todo_list });
        bindTaskEvents(listItem, taskCompleted);
    }

    var ajaxRequest = function () {
        console.log("AJAX Request");
    }

    addButton.addEventListener("click", addTask);
    addButton.addEventListener("click", ajaxRequest);

    var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
        console.log("bind list item events");

        var checkBox = taskListItem.querySelector("input[type=checkbox]");
        var editButton = taskListItem.querySelector("button.edit");
        var deleteButton = taskListItem.querySelector("button.delete");

        editButton.onclick = editTask;

        deleteButton.onclick = deleteTask;

        checkBox.onchange = checkBoxEventHandler;
    }

    for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
        bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
    }

    for (var i = 0; i < completedTasksHolder.children.length; i++) {
        bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
    }

    function taskManager(action, params = [], callback = function () { }) {
        $.ajax({
            type: 'POST',
            url: 'src/FormHandler.php',
            data: {
                action,
                params: params
            },
            dataType: 'json',
            success: function (data) {
                if (data['action'] === 'newTask') callback(data['task'], data['task_description']);
                if (data['action'] === 'completed') {
                    data["tasks"].forEach((item) => {
                        callback(item.task_id, item.task_description);
                    })
                }
                if (data['action'] === 'active') {
                    data["tasks"].forEach((item) => {
                        callback(item.task_id, item.task_description);
                    })
                }
            }
        });
    }
})

