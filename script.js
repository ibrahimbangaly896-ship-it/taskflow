// Charger les tâches depuis la mémoire du navigateur
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Sauvegarder les tâches
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Ajouter une tâche
function addTask() {
  let input = document.getElementById("taskInput");

  if (input.value === "") return;
input.focus();

  tasks.push({

  text: input.value,

  done: false,

  date: new Date().toLocaleDateString()

});
  input.value = "";

  saveTasks();
  renderTasks();
}

// Afficher les tâches
function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

 document.getElementById("taskCount").innerHTML =
  `Tu as ${tasks.length} tâche(s)`;
  let doneTasks = tasks.filter(task => task.done);

document.getElementById("doneCount").innerHTML =
  `${doneTasks.length} tâche(s) terminée(s)`;
  let filter = document.getElementById("filter").value;

tasks.forEach((task, index) => {

  if (filter === "done" && !task.done) return;

  if (filter === "todo" && task.done) return;
    let li = document.createElement("li");

    if (task.done) {
  li.classList.add("done");
}
    li.innerHTML = `
     <span>
        ${task.text}
        <br>
<small>${task.date}</small>
      </span>
      
      <div class="actions">

  <button onclick="toggleTask(${index})">✔️</button>

  <button onclick="editTask(${index})">✏️</button>

  <button onclick="deleteTask(${index})">❌</button>

</div>
`;

    list.appendChild(li);
  });
}

// Supprimer une tâche
function deleteTask(index) {

  let confirmation = confirm("Supprimer cette tâche ?");

  if (confirmation === true) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();

  }

}

// Marquer comme terminé
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// Afficher les tâches au démarrage
renderTasks();
document
  .getElementById("taskInput")
  .addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      addTask();
    }

  });
  document
  .getElementById("filter")
  .addEventListener("change", renderTasks);
  function clearTasks() {

  let confirmation = confirm("Supprimer toutes les tâches ?");

  if (confirmation === true) {

    tasks = [];

    saveTasks();

    renderTasks();

  }
}
  function editTask(index) {

  let newText = prompt(
    "Modifier la tâche :",
    tasks[index].text
  );

  if (newText !== null && newText.trim() !== "") {

    tasks[index].text = newText;

    saveTasks();

    renderTasks();

  }

}
function toggleDarkMode() {

  document.body.classList.toggle("dark");

}