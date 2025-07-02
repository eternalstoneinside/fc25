// === Глобальні змінні ===
const winnersSet = new Set(); // якщо треба — можна використовувати

// === Створення таблиці ===
function readyTableGo() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  const dropzones = document.querySelectorAll(".dropzone");

  dropzones.forEach((zone, index) => {
    const playerNumber = index + 1;

    zone.querySelectorAll(".team-card").forEach((card) => {
      const teamName = card.dataset.name;
      const teamLogo = card.querySelector("img").src;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="team-info">
            <img src="${teamLogo}" alt="${teamName}">
            <span>${teamName}</span>
          </div>
        </td>
        <td>
          <span class="player-label player-${playerNumber}">Гравець ${playerNumber}</span>
        </td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
      `;
      tableBody.appendChild(row);
    });
  });

  // Це все, нічого більше викликати тут не треба
}
function updatePlayerLabels() {
  const labels = document.querySelectorAll(".player-label");
  labels.forEach((span) => {
    if (window.innerWidth < 600) {
      if (span.textContent.includes("Гравець 1")) {
        span.textContent = "Г1";
      }
      if (span.textContent.includes("Гравець 2")) {
        span.textContent = "Г2";
      }
    } else {
      if (span.textContent === "Г1") {
        span.textContent = "Гравець 1";
      }
      if (span.textContent === "Г2") {
        span.textContent = "Гравець 2";
      }
    }
  });
}

// Один раз додаєш слухачі
window.addEventListener("resize", updatePlayerLabels);
window.addEventListener("load", updatePlayerLabels);

// Окрема функція генерації матчів
function generateBalancedMatches() {
  const matchesContainer = document.getElementById("matches-list");
  matchesContainer.innerHTML = "";

  let player1Teams = [];
  let player2Teams = [];

  const tableRows = document.querySelectorAll("#table-body tr");

  tableRows.forEach((row) => {
    const playerCell = row.querySelector("td:nth-child(2)");
    const playerLabel = playerCell ? playerCell.textContent.trim() : "";
    const teamName = row.querySelector(".team-info span").textContent.trim();
    const teamLogo = row.querySelector(".team-info img").src;

    if (playerLabel.includes("Гравець 1") || playerLabel.includes("Г1")) {
      player1Teams.push({ name: teamName, logo: teamLogo, count: 0 });
    } else if (
      playerLabel.includes("Гравець 2") ||
      playerLabel.includes("Г2")
    ) {
      player2Teams.push({ name: teamName, logo: teamLogo, count: 0 });
    }
  });

  if (player1Teams.length === 0 || player2Teams.length === 0) {
    matchesContainer.innerHTML =
      "<p>Недостатньо команд для генерації матчів.</p>";
    return;
  }

  player1Teams = shuffleArray(player1Teams);
  player2Teams = shuffleArray(player2Teams);

  let matchNumber = 1;
  const matches = [];

  while (
    player1Teams.some((t) => t.count < 2) ||
    player2Teams.some((t) => t.count < 2)
  ) {
    const p1 = player1Teams
      .filter((t) => t.count < 2)
      .sort((a, b) => a.count - b.count)[0];
    const p2Candidates = player2Teams
      .filter((t) => t.count < 2)
      .sort((a, b) => a.count - b.count);
    let p2 = null;

    for (let candidate of p2Candidates) {
      const existingMatch = matches.find(
        (m) => m.p1.name === p1.name && m.p2.name === candidate.name
      );
      if (!existingMatch) {
        p2 = candidate;
        break;
      }
    }

    if (!p2) {
      p2 = p2Candidates[0];
    }

    if (!p1 || !p2) break;

    matches.push({ p1, p2 });
    p1.count++;
    p2.count++;
  }

  matches.forEach((match) => {
    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match");
    matchDiv.innerHTML = `
      <div class="match-number">Матч ${matchNumber}</div>
      <div class="match-teams">
        <div class="team">
          <img src="${match.p1.logo}" alt="${match.p1.name}">
          <span>${match.p1.name}</span>
        </div>
        <span class="vs">VS</span>
        <div class="team">
          <img src="${match.p2.logo}" alt="${match.p2.name}">
          <span>${match.p2.name}</span>
        </div>
      </div>
      <div class="match-actions">
        <button class="btn-win" data-winner="${match.p1.name}" data-loser="${match.p2.name}">Переможець: ${match.p1.name}</button>
        <button class="btn-win" data-winner="${match.p2.name}" data-loser="${match.p1.name}">Переможець: ${match.p2.name}</button>
      </div>
    `;
    matchesContainer.appendChild(matchDiv);
    matchNumber++;
    // Викликати одразу після створення
    updatePlayerLabels();
  });

  localStorage.setItem("generatedMatches", JSON.stringify(matches));
  localStorage.setItem("matchesGenerated", "true");
}
function goToStage(stage) {
  document.querySelectorAll(".stage").forEach((s) => {
    s.classList.remove("active");
  });
  document.getElementById(`stage-${stage}`).classList.add("active");
}
// === Подія натискання на кнопку переможця ===
document
  .getElementById("matches-list")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-win")) {
      const winnerName = event.target.dataset.winner;
      const loserName = event.target.dataset.loser;

      updateTable(winnerName, loserName);

      const buttons = event.target.parentElement.querySelectorAll("button");
      buttons.forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.winner === winnerName) {
          btn.style.backgroundColor = "green";
          btn.style.color = "white";
          btn.style.cursor = "default";
          // позначаємо цю кнопку як переможну
          btn.dataset.winnerButton = "true";
        } else {
          btn.style.backgroundColor = "red";
          btn.style.color = "white";
          btn.style.cursor = "default";
        }
      });

      saveTableToLocalStorage();
      saveFinishedMatches();
    }
  });

// === Функції таблиці ===
function updateTable(winnerName, loserName) {
  const tableBody = document.getElementById("table-body");
  const rows = tableBody.querySelectorAll("tr");

  rows.forEach((row) => {
    const teamName = row.querySelector(".team-info span").textContent.trim();
    const cells = row.querySelectorAll("td");

    if (teamName === winnerName) {
      cells[2].textContent = parseInt(cells[2].textContent) + 1;
      cells[3].textContent = parseInt(cells[3].textContent) + 1;
      cells[5].textContent = parseInt(cells[5].textContent) + 3;
    } else if (teamName === loserName) {
      cells[2].textContent = parseInt(cells[2].textContent) + 1;
      cells[4].textContent = parseInt(cells[4].textContent) + 1;
    }
  });

  sortTableByPointsAndWins();
}

function sortTableByPointsAndWins() {
  const tableBody = document.getElementById("table-body");
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const pointsA = parseInt(a.querySelectorAll("td")[5].textContent);
    const pointsB = parseInt(b.querySelectorAll("td")[5].textContent);
    if (pointsB !== pointsA) return pointsB - pointsA;

    const winsA = parseInt(a.querySelectorAll("td")[3].textContent);
    const winsB = parseInt(b.querySelectorAll("td")[3].textContent);
    return winsB - winsA;
  });

  tableBody.innerHTML = "";
  rows.forEach((row) => tableBody.appendChild(row));
}

function resetPointsTable() {
  const tableBody = document.getElementById("table-body");
  const rows = tableBody.querySelectorAll("tr");

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    cells[2].textContent = "0";
    cells[3].textContent = "0";
    cells[4].textContent = "0";
    cells[5].textContent = "0";
  });

  sortTableByPointsAndWins();
  enableAllButtons();
  localStorage.removeItem("finishedMatches");
  localStorage.removeItem("tournamentTable");
}

function enableAllButtons() {
  const buttons = document.querySelectorAll("#matches-list .btn-win");
  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.style.backgroundColor = "";
    btn.style.color = "";
    btn.style.cursor = "";
  });
}

// === Збереження та відновлення ===
function saveTableToLocalStorage() {
  const rows = document.querySelectorAll("#table-body tr");
  const tableData = [];

  rows.forEach((row) => {
    const teamName = row.querySelector(".team-info span").textContent;
    const teamLogo = row.querySelector(".team-info img").src;
    const player = row.querySelector(".player-label").textContent.trim();
    const cells = row.querySelectorAll("td");

    tableData.push({
      name: teamName,
      logo: teamLogo,
      player,
      games: parseInt(cells[2].textContent),
      wins: parseInt(cells[3].textContent),
      losses: parseInt(cells[4].textContent),
      points: parseInt(cells[5].textContent),
    });
  });

  localStorage.setItem("tournamentTable", JSON.stringify(tableData));
}

function loadTableFromLocalStorage() {
  try {
    const saved = localStorage.getItem("tournamentTable");
    if (!saved) return;

    const tableData = JSON.parse(saved);
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    tableData.forEach((team) => {
      // Визначаємо клас за текстом
      let playerClass = "";
      if (team.player.includes("1")) {
        playerClass = "player-1";
      } else if (team.player.includes("2")) {
        playerClass = "player-2";
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="team-info">
            <img src="${team.logo}" alt="${team.name}">
            <span>${team.name}</span>
          </div>
        </td>
        <td><span class="player-label ${playerClass}">${team.player}</span></td>
        <td>${team.games}</td>
        <td>${team.wins}</td>
        <td>${team.losses}</td>
        <td>${team.points}</td>
      `;
      tableBody.appendChild(row);
    });

    sortTableByPointsAndWins();
  } catch (e) {
    console.error("Помилка при завантаженні таблиці:", e);
    localStorage.removeItem("tournamentTable");
  }
}
function saveFinishedMatches() {
  const matches = [];
  document.querySelectorAll("#matches-list .match").forEach((matchDiv) => {
    const winnerButton = matchDiv.querySelector(
      ".btn-win[data-winner-button='true']"
    );
    if (winnerButton) {
      matches.push({
        winner: winnerButton.dataset.winner,
        loser: winnerButton.dataset.loser,
      });
    }
  });

  // Зчитуємо вже збережені
  const existing = JSON.parse(localStorage.getItem("finishedMatches") || "[]");

  // Додаємо тільки ті, яких ще нема
  matches.forEach((newMatch) => {
    const duplicate = existing.find(
      (m) => m.winner === newMatch.winner && m.loser === newMatch.loser
    );
    if (!duplicate) {
      existing.push(newMatch);
    }
  });

  // Перезаписуємо весь список
  localStorage.setItem("finishedMatches", JSON.stringify(existing));
}

function restoreFinishedMatches() {
  const savedMatches = JSON.parse(
    localStorage.getItem("finishedMatches") || "[]"
  );

  const matchDivs = document.querySelectorAll("#matches-list .match");

  savedMatches.forEach(({ winner, loser }) => {
    matchDivs.forEach((div) => {
      const btns = div.querySelectorAll(".btn-win");
      btns.forEach((btn) => {
        if (btn.dataset.winner === winner && btn.dataset.loser === loser) {
          btn.disabled = true;
          btn.style.backgroundColor = "green";
          btn.style.color = "white";
          btn.style.cursor = "default";
        } else if (
          btn.dataset.winner === loser &&
          btn.dataset.loser === winner
        ) {
          btn.disabled = true;
          btn.style.backgroundColor = "red";
          btn.style.color = "white";
          btn.style.cursor = "default";
        }
      });
    });
  });
}

// === Утиліта ===
function shuffleArray(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
// === Ініціалізація ===
// localStorage.clear();
function fullResetTournament() {
  localStorage.removeItem("matchesGenerated");
  localStorage.removeItem("tournamentTable");
  localStorage.removeItem("finishedMatches");
  localStorage.removeItem("generatedMatches");
  localStorage.removeItem("selectedTeams");
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("matchesGenerated") === "true") {
    stageSelection.classList.remove("active");
    stageAssign.classList.remove("active");
    stageTable.classList.add("active");
  }
  const matchesAlreadyGenerated =
    localStorage.getItem("matchesGenerated") === "true";

  if (matchesAlreadyGenerated) {
    // Показати секцію таблиці
    document
      .querySelectorAll(".stage")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById("stage-table").classList.add("active");

    // Завантажити таблицю та результати
    loadTableFromLocalStorage();
    restoreGeneratedMatches();
    restoreFinishedMatches();

    // Заблокувати кнопки на попередніх етапах
    const blockButtons = [
      "autoFillTeams",
      "randomizeTeams",
      "removeAllTeams",
      "startTable",
      "autoFillPlayers",
      "randomizePlayers",
      "resetAssignments",
      "createTable",
    ];

    blockButtons.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = true;
        el.style.opacity = "0.5";
        el.style.cursor = "not-allowed";
      }
    });

    // Блокування навігації назад (через goToStage уже реалізовано)
  }
});

function restoreGeneratedMatches() {
  const saved = localStorage.getItem("generatedMatches");
  if (!saved) return;

  const matches = JSON.parse(saved);
  const matchesContainer = document.getElementById("matches-list");
  matchesContainer.innerHTML = "";

  matches.forEach((match, index) => {
    const matchDiv = document.createElement("div");
    matchDiv.classList.add("match");
    matchDiv.innerHTML = `
      <div class="match-number">Матч ${index + 1}</div>
      <div class="match-teams">
        <div class="team">
          <img src="${match.p1.logo}" alt="${match.p1.name}">
          <span>${match.p1.name}</span>
        </div>
        <span class="vs">VS</span>
        <div class="team">
          <img src="${match.p2.logo}" alt="${match.p2.name}">
          <span>${match.p2.name}</span>
        </div>
      </div>
      <div class="match-actions">
        <button class="btn-win" data-winner="${match.p1.name}" data-loser="${
      match.p2.name
    }">Переможець: ${match.p1.name}</button>
        <button class="btn-win" data-winner="${match.p2.name}" data-loser="${
      match.p1.name
    }">Переможець: ${match.p2.name}</button>
      </div>
    `;
    matchesContainer.appendChild(matchDiv);
  });
}
