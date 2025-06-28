const allTeams = [
  // Твої попередні команди
  {
    name: "Real Madrid",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  },
  {
    name: "Barcelona",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
  },
  {
    name: "Manchester United",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  },
  {
    name: "Liverpool",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  },
  {
    name: "Bayern Munich",
    logo: "img/bayern-munih.png",
  },
  {
    name: "Juventus",
    logo: "img/juventus.svg",
  },
  {
    name: "Chelsea",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  },
  {
    name: "Arsenal",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  },
  {
    name: "PSG",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
  },
  {
    name: "AC Milan",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
  },
  {
    name: "Aston Villa",
    logo: "img/aston-villa.png",
  },
  {
    name: "Girona",
    logo: "img/girona.png",
  },
  {
    name: "Borussia Dortmund",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
  },
  {
    name: "Inter Milan",
    logo: "img/inter.png",
  },
  {
    name: "Atletico Madrid",
    logo: "img/atletico-madrid.png",
  },
  {
    name: "Sevilla",
    logo: "img/sevilla.png",
  },
  {
    name: "Napoli",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Neapel.svg",
  },
  {
    name: "West Ham United",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
  },
  {
    name: "Leicester City",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg",
  },
  {
    name: "Roma",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg",
  },
  {
    name: "Tottenham Hotspur",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
  },
  {
    name: "Olympique Lyonnais",
    logo: "img/olimpiq.png",
  },
  {
    name: "Ajax",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg",
  },
  {
    name: "Benfica",
    logo: "img/benfica.webp",
  },
  {
    name: "Porto",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg",
  },
  {
    name: "Villarreal",
    logo: "img/villareal.png",
  },
  {
    name: "RB Leipzig",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg",
  },
  {
    name: "Fiorentina",
    logo: "img/fiorentina.png",
  },
  {
    name: "Lazio",
    logo: "img/lazio.png",
  },
  {
    name: "Sporting CP",
    logo: "img/sporting.png",
  },
  {
    name: "Galatasaray",
    logo: "img/galatasaray.png",
  },
  {
    name: "Marseille",
    logo: "img/marsel.png",
  },
  {
    name: "Besiktas",
    logo: "img/besiktas.png",
  },
  {
    name: "Fenerbahçe",
    logo: "img/fenerbace.png",
  },
  {
    name: "Real Sociedad",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg",
  },
  {
    name: "Valencia",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg",
  },
  {
    name: "Bayer Leverkusen",
    logo: "img/bayer.png",
  },
  {
    name: "Lille",
    logo: "img/lil.png",
  },
  {
    name: "Atalanta",
    logo: "img/atalanta.png",
  },
  // Нові додані команди
  {
    name: "Athletic Bilbao",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg",
  },
  {
    name: "Real Betis",
    logo: "img/betis.png",
  },
  {
    name: "Newcastle United",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
  },
  {
    name: "Everton",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
  },
  {
    name: "Brighton",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg",
  },
  {
    name: "Torino",
    logo: "img/torino.png",
  },
  {
    name: "Sampdoria",
    logo: "img/sampdoria.png",
  },
  {
    name: "Udinese",
    logo: "img/udinese.png",
  },
  {
    name: "Borussia Mönchengladbach",
    logo: "img/borussia.png",
  },
  {
    name: "Eintracht Frankfurt",
    logo: "img/frankfurt.png",
  },
  {
    name: "VfL Wolfsburg",
    logo: "img/wolfsburg.svg",
  },
  {
    name: "AS Monaco",
    logo: "img/monaco.png",
  },
  {
    name: "OGC Nice",
    logo: "img/nice.png",
  },
  {
    name: "Rennes",
    logo: "img/renes.png",
  },
  {
    name: "PSV Eindhoven",
    logo: "img/psv.png",
  },
  {
    name: "Feyenoord",
    logo: "img/feyenord.png",
  },
  {
    name: "Club Brugge",
    logo: "img/brugge.png",
  },
  {
    name: "Anderlecht",
    logo: "img/anderleht.png",
  },
  {
    name: "Celtic",
    logo: "img/celtic.png",
  },
  {
    name: "Rangers",
    logo: "img/rangers.webp",
  },
];

const stageSelection = document.getElementById("stage-selection");
const stageAssign = document.getElementById("stage-assign");
const stageTable = document.getElementById("stage-table");

const startTableButton = document.getElementById("startTable");

const hint = document.getElementById("hint");

startTableButton.addEventListener("click", () => {
  stageSelection.classList.remove("active");
  stageSelection.classList.add("left");
  stageAssign.classList.remove("right");
  stageAssign.classList.add("active");
  readyTable();
  renderTeamsPool();
});

function readyTable() {
  if (selectedTeams.length >= 16) {
    startTableButton.disabled = false;
    hint.style.display = "none";
    startTableButton.style.opacity = "1";
    startTableButton.style.cursor = "pointer";
  } else {
    startTableButton.disabled = true;
    hint.style.display = "inline-block";
    startTableButton.style.opacity = "0.5";
    startTableButton.style.cursor = "not-allowed";
  }
}

const searchInput = document.getElementById("searchInput");
const teamList = document.getElementById("teamList");
const selectedTeamsDiv = document.getElementById("selectedTeams");

let selectedTeams = [];

// Завантаження зі сховища
function loadSelectedTeams() {
  const data = localStorage.getItem("selectedTeams");
  if (data) {
    try {
      selectedTeams = JSON.parse(data);
    } catch (e) {
      selectedTeams = [];
    }
  }
}

// Збереження у сховище
function saveSelectedTeams() {
  localStorage.setItem("selectedTeams", JSON.stringify(selectedTeams));
}

// Нормалізація імені для порівняння
function normalizeName(name) {
  return name.trim().toLowerCase();
}

function renderTeams(filter = "") {
  teamList.innerHTML = "";
  const filtered = allTeams.filter((team) =>
    normalizeName(team.name).includes(normalizeName(filter))
  );

  if (filtered.length === 0) {
    teamList.innerHTML = "<p>Нічого не знайдено.</p>";
    return;
  }

  filtered.forEach((team) => {
    const isSelected = selectedTeams.some(
      (t) => normalizeName(t.name) === normalizeName(team.name)
    );

    const isDisabled = isSelected || selectedTeams.length >= 16;

    const div = document.createElement("div");
    div.className = "team-item";
    div.innerHTML = `
      <div class="team-info">
        <img src="${team.logo}" alt="Логотип" width="40" height="40">
        <span>${team.name}</span>
      </div>
      <button ${
        isDisabled ? "disabled style='opacity:0.5; cursor:not-allowed'" : ""
      }>Додати</button>
    `;

    const btn = div.querySelector("button");
    btn.addEventListener("click", () => addTeam(team));
    teamList.appendChild(div);
  });
}

function renderSelectedTeams() {
  selectedTeamsDiv.innerHTML = "";
  const selectedCountDiv = document.getElementById("selectedCount");

  if (selectedTeams.length === 0) {
    selectedCountDiv.textContent = "Обрано 0 команд.";
    return;
  }

  selectedTeams.forEach((team) => {
    const div = document.createElement("div");
    div.className = "team-item";
    div.innerHTML = `
      <div class="team-info">
        <img src="${team.logo}" alt="Логотип" width="40" height="40">
        <span>${team.name}</span>
      </div>
      <button class="remove-btn">Видалити</button>
    `;
    const btn = div.querySelector("button");
    btn.addEventListener("click", () => removeTeam(team.name));
    selectedTeamsDiv.appendChild(div);
  });

  selectedCountDiv.textContent = `Обрано команд: ${selectedTeams.length}`;
}

function removeTeam(teamName) {
  selectedTeams = selectedTeams.filter(
    (t) => normalizeName(t.name) !== normalizeName(teamName)
  );
  saveSelectedTeams();
  renderSelectedTeams();
  readyTable();
  renderTeams(searchInput.value);
}

const removeAllTeamsBtn = document.getElementById("removeAllTeams");

removeAllTeamsBtn.addEventListener("click", () => {
  selectedTeams = []; // Очищаємо масив вибраних команд
  saveSelectedTeams(); // Зберігаємо у localStorage
  readyTable();
  renderSelectedTeams(); // Оновлюємо відображення вибраних
  renderTeams(searchInput.value); // Оновлюємо список команд (щоб кнопки знову активувались)
});
function addTeam(team) {
  if (
    selectedTeams.length >= 16 || // Якщо вже 16, не даємо додати
    selectedTeams.some(
      (t) => normalizeName(t.name) === normalizeName(team.name)
    )
  ) {
    // Повідомлення прибране, просто виходимо
    return;
  }
  selectedTeams.push(team);
  saveSelectedTeams();
  readyTable();
  renderSelectedTeams();
  renderTeams(searchInput.value);
}

searchInput.addEventListener("input", () => {
  renderTeams(searchInput.value);
});

function autoFillTeams() {
  const needed = 16 - selectedTeams.length;
  if (needed <= 0) return; // Нічого не додаємо, якщо вже 16 або більше

  // Фільтруємо доступні команди, щоб не було повторів
  const availableTeams = allTeams.filter(
    (team) =>
      !selectedTeams.some(
        (selected) => normalizeName(selected.name) === normalizeName(team.name)
      )
  );

  // Перемішуємо доступні команди
  const shuffled = availableTeams.sort(() => Math.random() - 0.5);

  // Вибираємо стільки, скільки потрібно
  const teamsToAdd = shuffled.slice(0, needed);

  // Додаємо до вже вибраних
  selectedTeams = [...selectedTeams, ...teamsToAdd];

  // Зберігаємо і оновлюємо відображення
  saveSelectedTeams();
  readyTable();
  renderSelectedTeams();
  renderTeams(searchInput.value);
}
function randomizeTeams() {
  const shuffled = [...allTeams].sort(() => Math.random() - 0.5);
  selectedTeams = shuffled.slice(0, 16);

  saveSelectedTeams();
  readyTable();
  renderSelectedTeams();
  renderTeams(searchInput.value);
}
// Ініціалізація
loadSelectedTeams();
renderTeams();
renderSelectedTeams();
readyTable();
document
  .getElementById("autoFillTeams")
  .addEventListener("click", autoFillTeams);
document
  .getElementById("randomizeTeams")
  .addEventListener("click", randomizeTeams);

function getAllAssignedTeamNames() {
  const assigned = [];
  document.querySelectorAll(".dropzone .team-card").forEach((el) => {
    assigned.push(normalizeName(el.dataset.name));
  });
  return assigned;
}

function renderTeamsPool() {
  const pool = document.querySelector(".teams-pool");
  pool.innerHTML = "";

  const assignedNames = getAllAssignedTeamNames();

  selectedTeams
    .filter((team) => !assignedNames.includes(normalizeName(team.name)))
    .forEach((team) => {
      const div = document.createElement("div");
      div.className = "team-card";
      div.draggable = true;
      div.dataset.name = team.name;
      div.innerHTML = `
        <img src="${team.logo}" width="40" height="40" alt="logo">
        <span>${team.name}</span>
      `;

      div.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", team.name);
      });

      pool.appendChild(div);
    });
}

// Додаємо drag & drop на зони гравців
document.querySelectorAll(".dropzone").forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("dragover");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("dragover");
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("dragover");

    const teamName = e.dataTransfer.getData("text/plain");
    const team = selectedTeams.find(
      (t) => normalizeName(t.name) === normalizeName(teamName)
    );
    if (!team) return;

    // Якщо команда вже є в цій зоні — не додаємо
    if (zone.querySelector(`[data-name="${team.name}"]`)) return;

    // Якщо більше ніж 8 команд — блок
    if (zone.querySelectorAll(".team-card").length >= 8) {
      alert("Максимум 8 команд на одного гравця.");
      return;
    }

    // Видаляємо з інших зон
    document.querySelectorAll(".dropzone .team-card").forEach((el) => {
      if (normalizeName(el.dataset.name) === normalizeName(teamName)) {
        el.remove();
      }
    });

    // Створюємо нову картку
    const div = document.createElement("div");
    div.className = "team-card";
    div.draggable = true;
    div.dataset.name = team.name;
    div.innerHTML = `
      <img src="${team.logo}" width="30" height="30" alt="logo">
      <span>${team.name}</span>
    `;

    div.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", team.name);
    });

    zone.appendChild(div);
    renderTeamsPool(); // Оновлюємо пул
    checkReadyToCreateTable();
  });
});

// Додаємо drag & drop на pool (щоб повернути команду назад)
const pool = document.querySelector(".teams-pool");
pool.addEventListener("dragover", (e) => {
  e.preventDefault();
  pool.classList.add("dragover");
});

pool.addEventListener("dragleave", () => {
  pool.classList.remove("dragover");
});

pool.addEventListener("drop", (e) => {
  e.preventDefault();
  pool.classList.remove("dragover");

  const teamName = e.dataTransfer.getData("text/plain");

  // Видаляємо команду з усіх гравців
  document.querySelectorAll(".dropzone .team-card").forEach((el) => {
    if (normalizeName(el.dataset.name) === normalizeName(teamName)) {
      el.remove();
    }
  });

  renderTeamsPool();
  checkReadyToCreateTable(); // Додаємо назад у пул
});
function checkReadyToCreateTable() {
  const allZones = document.querySelectorAll(".dropzone");
  const ready = Array.from(allZones).every(
    (zone) => zone.querySelectorAll(".team-card").length === 8
  );

  const button = document.getElementById("createTable");
  button.disabled = !ready;

  if (ready) {
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  } else {
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";
  }
}

document.getElementById("createTable").addEventListener("click", () => {
  document.querySelector(".stage.active").classList.remove("active");
  document.getElementById("stage-table").classList.add("active");
});

const createTable = document.getElementById("createTable");

createTable.addEventListener("click", () => {
  stageAssign.classList.remove("active");
  stageAssign.classList.add("left");
  stageTable.classList.remove("right");
  stageTable.classList.add("active");
  readyTable();
  renderTeamsPool();
});

// Функція очистити всі дропзони (зони гравців)
function clearPlayerZones() {
  document
    .querySelectorAll(".dropzone")
    .forEach((zone) => (zone.innerHTML = ""));
}

// Автодоповнення: рівномірно розподілити по 8 команд, перші доступні
function autoFillPlayers() {
  const playerZones = document.querySelectorAll(".dropzone");
  const player1 = playerZones[0];
  const player2 = playerZones[1];

  // Збираємо імена команд, які вже є у гравців (по зоні)
  const assignedInPlayer1 = Array.from(
    player1.querySelectorAll(".team-card")
  ).map((el) => normalizeName(el.dataset.name));
  const assignedInPlayer2 = Array.from(
    player2.querySelectorAll(".team-card")
  ).map((el) => normalizeName(el.dataset.name));

  // Потрібно скільки додати, щоб було 8
  const neededPlayer1 = 8 - assignedInPlayer1.length;
  const neededPlayer2 = 8 - assignedInPlayer2.length;

  // Всі імена вже призначених команд у обох гравців
  const assignedAll = [...assignedInPlayer1, ...assignedInPlayer2];

  // Вільні команди, які можна додати (не призначені поки нікому)
  const freeTeams = selectedTeams.filter(
    (team) => !assignedAll.includes(normalizeName(team.name))
  );

  // Перемішуємо вільні команди
  const shuffledFree = freeTeams.sort(() => Math.random() - 0.5);

  // Додаємо команди гравцю 1
  for (let i = 0; i < neededPlayer1; i++) {
    if (!shuffledFree[i]) break;
    addTeamToZone(player1, shuffledFree[i]);
  }

  // Додаємо команди гравцю 2
  for (let i = neededPlayer1; i < neededPlayer1 + neededPlayer2; i++) {
    if (!shuffledFree[i]) break;
    addTeamToZone(player2, shuffledFree[i]);
  }

  renderTeamsPool(); // Оновлюємо пул (залишаться команди, які ніде не призначені)
  checkReadyToCreateTable();
}

// Рандомно розподілити 16 команд по двох гравцях по 8
function randomizePlayers() {
  clearPlayerZones();

  const shuffled = [...selectedTeams].sort(() => Math.random() - 0.5);
  const playerZones = document.querySelectorAll(".dropzone");
  const player1 = playerZones[0];
  const player2 = playerZones[1];

  shuffled.slice(0, 8).forEach((team) => {
    addTeamToZone(player1, team);
  });

  shuffled.slice(8, 16).forEach((team) => {
    addTeamToZone(player2, team);
  });

  renderTeamsPool();
  checkReadyToCreateTable();
}

// Допоміжна функція додати команду у зону гравця (створює div.team-card)
function addTeamToZone(zone, team) {
  // Перевіряємо ліміт
  if (zone.querySelectorAll(".team-card").length >= 8) return;

  const div = document.createElement("div");
  div.className = "team-card";
  div.draggable = true;
  div.dataset.name = team.name;
  div.innerHTML = `
    <img src="${team.logo}" width="30" height="30" alt="logo">
    <span>${team.name}</span>
  `;

  // Додаємо dragstart для перетягування назад або між гравцями
  div.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", team.name);
  });

  zone.appendChild(div);
}
document
  .getElementById("autoFillPlayers")
  .addEventListener("click", autoFillPlayers);
document
  .getElementById("randomizePlayers")
  .addEventListener("click", randomizePlayers);

document.getElementById("resetAssignments").addEventListener("click", () => {
  // Видаляємо всі команди з усіх drop-зон
  document
    .querySelectorAll(".dropzone .team-card")
    .forEach((el) => el.remove());

  // Оновлюємо пул команд (тепер усі доступні)
  renderTeamsPool();

  // Оновлюємо кнопку створення таблиці (вимикаємо)
  checkReadyToCreateTable();
});
