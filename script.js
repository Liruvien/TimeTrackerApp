const apikey = "5c35221a1-96a6-00c7-feab-41165844a0c";
const apihost = "https://todo-api.coderslab.pl";

function apiListTasks() {
  return fetch(apihost + "/api/tasks", {
    headers: { Authorization: apikey },
  }).then(function (resp) {
    if (!resp.ok) {
      alert("Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny");
    }
    return resp.json();
  });
}

function apiCreateTask(title, description) {
  return fetch(apihost + "/api/tasks", {
    headers: { Authorization: apikey, "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, description: description, status: "open" }),
    method: "POST",
  }).then(function (resp) {
    if (!resp.ok) {
      alert("Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny");
    }
    return resp.json();
  });
}
}

function apiUpdateTask(taskId, title, description, status) {
  return fetch(apihost + "/api/tasks/" + taskId, {
    headers: { Authorization: apikey, "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, description: description, status: status }),
    method: "PUT",
  }).then(function (resp) {
    if (!resp.ok) {
      alert("Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny");
    }
    return resp.json();
  });
}

function apiDeleteTask(taskId) {
  return fetch(apihost + "/api/tasks/" + taskId, {
    headers: { Authorization: apikey },
    method: "DELETE",
  }).then(function (resp) {
    if (!resp.ok) {
      alert("Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny");
    }
    return resp.json();
  });
}

function apiListOperationsForTask(taskId) {
  return fetch(apihost + "/api/tasks/" + taskId + "/operations", { headers: { Authorization: apikey } }).then(
    function (resp) {
      return resp.json();
    },
  );
}

function renderTask(taskId, title, description, status) {
  const section = document.createElement("section");
  section.className = "card mt-5 shadow-sm";
  document.querySelector("main").appendChild(section);

  const headerDiv = document.createElement("div");
  headerDiv.className = "card-header d-flex justify-content-between align-items-center";
  section.appendChild(headerDiv);

  const headerLeftDiv = document.createElement("div");
  headerDiv.appendChild(headerLeftDiv);

  const h5 = document.createElement("h5");
  h5.innerText = title;
  headerLeftDiv.appendChild(h5);

  const h6 = document.createElement("h6");
  h6.className = "card-subtitle text-muted";
  h6.innerText = description;
  headerLeftDiv.appendChild(h6);

  const headerRightDiv = document.createElement("div");
  headerDiv.appendChild(headerRightDiv);


  if (status == "open") {
    const finishButton = document.createElement("button");
    finishButton.className = "btn btn-dark btn-sm js-task-open-only";
    finishButton.innerText = "Finish";
    headerRightDiv.appendChild(finishButton);

  }

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-outline-danger btn-sm ml-2";
  deleteButton.innerText = "Delete";
  headerRightDiv.appendChild(deleteButton);


  const ul = document.createElement("ul");
  ul.className = "list-group list-group-flush";
  section.appendChild(ul);


  if (status == "open") {
    const addOperationDiv = document.createElement("div");
    addOperationDiv.className = "card-body js-task-open-only";
    section.appendChild(addOperationDiv);

    const form = document.createElement("form");
    addOperationDiv.appendChild(form);

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    form.appendChild(inputGroup);

    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.setAttribute("placeholder", "Operation description");
    descriptionInput.setAttribute("minlength", "5");
    descriptionInput.className = "form-control";
    inputGroup.appendChild(descriptionInput);

    const inputGroupAppend = document.createElement("div");
    inputGroupAppend.className = "input-group-append";
    inputGroup.appendChild(inputGroupAppend);

    const addButton = document.createElement("button");
    addButton.className = "btn btn-info";
    addButton.innerText = "Add";
    inputGroupAppend.appendChild(addButton);


  }
}

document.addEventListener("DOMContentLoaded", function () {
  apiListTasks().then(function (response) {
    response.data.forEach(function (task) {
      renderTask(task.id, task.title, task.description, task.status);
    });
  });
});
