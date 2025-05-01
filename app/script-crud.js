const btnAddTask = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const ulTasks = document.querySelector(".app__section-task-list");
const btnCancel = document.querySelector(".app__form-footer__button--cancel");
const taskDescriptionParagraph = document.querySelector(
  ".app__section-active-task-description"
);

const btnRemoveCompleteTasks = document.querySelector(
  "#btn-remover-concluidas"
);
const btnRemoveAllTasks = document.querySelector("#btn-remover-todas");

let toDoList = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;
let liSelectdTask = null;

function clearForm() {
  textarea.value = "";
  formAddTask.classList.add("hidden");
}

btnCancel.addEventListener("click", clearForm);

function uptadeTask() {
  localStorage.setItem("tasks", JSON.stringify(toDoList));
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
  `;

  const paragraph = document.createElement("p");
  paragraph.textContent = task.description;
  paragraph.classList.add("app__section-task-list-item-description");

  const button = document.createElement("button");
  button.classList.add("app_button-edit");

  button.onclick = async () => {
    const newDescription = await customPrompt("Qual é o novo nome da tarefa?");
    if (!newDescription) {
      showPopup(
        "Atenção!",
        "É necessário inserir um novo nome para a nova tarefa."
      );
    } else {
      paragraph.textContent = newDescription;
      task.description = newDescription;
      uptadeTask();
    }
  };

  const buttonImage = document.createElement("img");
  buttonImage.setAttribute("src", "/assets/edit.png");
  button.append(buttonImage);

  li.append(svg);
  li.append(paragraph);
  li.append(button);

  if (task.complete) {
    li.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "disabled");
  } else {
    li.onclick = () => {
      document
        .querySelectorAll(".app__section-task-list-item-active")
        .forEach((elemento) => {
          elemento.classList.remove("app__section-task-list-item-active");
        });
      if (selectedTask == task) {
        taskDescriptionParagraph.textContent = "";
        selectedTask = null;
        liSelectdTask = null;
        return;
      }
      selectedTask = task;
      liSelectdTask = li;
      taskDescriptionParagraph.textContent = task.description;

      li.classList.add("app__section-task-list-item-active");
    };
  }

  return li;
}

btnAddTask.addEventListener("click", () => {
  formAddTask.classList.toggle("hidden");
});

formAddTask.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const task = {
    description: textarea.value,
  };
  toDoList.push(task);
  const taskElement = createTaskElement(task);
  ulTasks.append(taskElement);
  uptadeTask();
  textarea.value = "";
  formAddTask.classList.add("hidden");
});

toDoList.forEach((task) => {
  const taskElement = createTaskElement(task);
  ulTasks.append(taskElement);
});

document.addEventListener("FocusFinished", () => {
  if (selectedTask && liSelectdTask) {
    liSelectdTask.classList.remove("app__section-task-list-item-active");
    liSelectdTask.classList.add("app__section-task-list-item-complete");
    liSelectdTask.querySelector("button").setAttribute("disabled", "disabled");
    selectedTask.complete = true;
    uptadeTask();
  }
});

const removeTasks = (onlyComplete) => {
  const selector = onlyComplete
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";
  document.querySelectorAll(selector).forEach((elemento) => {
    elemento.remove();
  });
  toDoList = onlyComplete ? toDoList.filter((task) => !task.complete) : [];
  uptadeTask();
};

btnRemoveCompleteTasks.onclick = () => {
  removeTasks(true);
};
btnRemoveAllTasks.onclick = () => {
  removeTasks(false);
};
