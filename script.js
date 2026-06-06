let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// =========================
// DARK MODE
// =========================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// =========================
// AJOUTER UNE TÂCHE
// =========================
function addTask() {
  const input = document.getElementById("taskInput");
  const category = document.getElementById("category");
  const notification = document.getElementById("notification");

  const text = input.value.trim();

  // VALIDATION
  if (text === "") {
    notification.innerText = "⚠️ Tu dois écrire une tâche !";
    return;
  }

  if (text.length < 3) {
    notification.innerText = "⚠️ Minimum 3 caractères";
    return;
  }

  notification.innerText = "";

  tasks.push({
    text: text,
    category: category.value,
    completed: false
  });

  input.value = "";

  saveAndRender();
}

// =========================
// SUPPRIMER TOUT
// =========================
function clearTasks() {
  tasks = [];
  saveAndRender();
}

// =========================
// TOGGLE DONE
// =========================
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// =========================
// SUPPRIMER UNE TÂCHE
// =========================
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// =========================
// FILTRAGE + AFFICHAGE
// =========================
function renderTasks() {
  const list = document.getElementById("taskList");
  const filter = document.getElementById("filter").value;

  list.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "done") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "todo") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
  <span class="${task.completed ? "done" : ""}">
    ${task.text} (${task.category})
  </span>

  <button onclick="toggleTask(${index})">✔</button>
  <button onclick="editTask(${index})">✏️</button>
  <button onclick="deleteTask(${index})">❌</button>
`;

    list.appendChild(li);
  });

  updateStats();
}

// =========================
// RECHERCHE
// =========================
document.getElementById("searchInput").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const items = document.querySelectorAll("#taskList li");

  items.forEach(item => {
    item.style.display =
      item.textContent.toLowerCase().includes(value)
        ? "flex"
        : "none";
  });
});

// =========================
// STATS + BARRE
// =========================
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;

  document.getElementById("taskCount").innerText =
    `Tu as ${total} tâche(s)`;

  document.getElementById("doneCount").innerText =
    `${done} terminée(s)`;

  const percent = total === 0 ? 0 : (done / total) * 100;

  document.getElementById("progressBar").style.width =
    percent + "%";
}

// =========================
// SAUVEGARDE
// =========================
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// =========================
// FILTRE CHANGE
// =========================
document.getElementById("filter").addEventListener("change", renderTasks);

// =========================
// INIT
// =========================
renderTasks();
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("taskInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
});
function editTask(index) {
  const newText = prompt("Modifier la tâche :", tasks[index].text);

  if (newText === null) return; // annuler

  const trimmed = newText.trim();

  if (trimmed === "") {
    alert("La tâche ne peut pas être vide !");
    return;
  }

  if (trimmed.length < 3) {
    alert("Minimum 3 caractères !");
    return;
  }

  tasks[index].text = trimmed;

  saveAndRender();
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("SW enregistré"))
    .catch(err => console.log("Erreur SW", err));
}