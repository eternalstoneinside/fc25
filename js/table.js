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
  matchesContainer.style.display = "block";
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
    if (areAllMatchesPlayed()) {
      checkTiebreakerAvailability();
      checkIfTournamentFullyFinished(); // ✅ тут
    }

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
      // ✅ Додай це:
      if (areAllMatchesPlayed()) {
        checkTiebreakerAvailability();
        checkIfTournamentFullyFinished(); // ✅ тут
      }
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
  if (
    document.getElementById("tiebreak-section").classList.contains("active")
  ) {
    document.getElementById("tiebreak-section").classList.remove("active");
  }
  // Скидаємо тайбрейк-матчі
  document.querySelector("#next-stage-section").classList.add("hidden");
  localStorage.removeItem("tiebreakResults");
  localStorage.removeItem("tiebreakerMatches");
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
  localStorage.removeItem("tiebreakerMatches");
  localStorage.removeItem("tiebreakResults");
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

    if (areAllMatchesPlayed()) {
      checkTiebreakerAvailability();
      checkIfTournamentFullyFinished(); // ✅ тут
      restoreTiebreakMatches();
    }
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

// === Перевірка завершення турніру ===
function areAllMatchesPlayed() {
  const totalButtons = document.querySelectorAll("#matches-list .btn-win");
  const disabledButtons = [...totalButtons].filter((btn) => btn.disabled);
  const tableMatches = (document.querySelector(
    ".table-matches"
  ).style.alignItems = "self-start");
  const totalMatches = totalButtons.length / 2;
  const finishedMatches = disabledButtons.length / 2;
  return finishedMatches === totalMatches;
}
function checkTiebreakerAvailability() {
  const tieTeams = getTiebreakerTeams();
  const allPlayed = areAllMatchesPlayed();

  const section = document.getElementById("tiebreak-section");
  if (allPlayed && tieTeams.length >= 2) {
    section.classList.add("active");
  } else {
    section.classList.remove("active");
  }
}

function generateTiebreakerMatches() {
  const teams = getTiebreakerTeams();
  const matchesContainer = document.getElementById("tiebreak-matches");
  matchesContainer.innerHTML = "";

  if (teams.length < 2) {
    matchesContainer.innerHTML = "<p>Недостатньо команд для тайбрейку.</p>";
    return;
  }

  // Відокремлюємо команди по гравцях
  const g1 = teams.filter((t) => t.player.includes("1") || t.player === "Г1");
  const g2 = teams.filter((t) => t.player.includes("2") || t.player === "Г2");

  const matches = [];

  if (g1.length > 0 && g2.length > 0) {
    // Потрібно спробувати сформувати пари між гравцями 1 та 2

    // Шафл команди, щоб пари були випадкові
    const shuffledG1 = shuffleArray(g1);
    const shuffledG2 = shuffleArray(g2);

    // Формуємо пари скільки можемо по мінімуму команд обох гравців
    const pairsCount = Math.min(shuffledG1.length, shuffledG2.length);

    for (let i = 0; i < pairsCount; i++) {
      matches.push({ team1: shuffledG1[i], team2: shuffledG2[i] });
    }

    // Якщо залишилися команди без пари (наприклад, у гравця 1 команд більше)
    // То беремо ці залишки і рандомно формуємо пари серед усіх тайбрейк-команд,
    // щоб не залишити їх без суперника
    const leftoverTeams = [];

    if (shuffledG1.length > pairsCount) {
      leftoverTeams.push(...shuffledG1.slice(pairsCount));
    }
    if (shuffledG2.length > pairsCount) {
      leftoverTeams.push(...shuffledG2.slice(pairsCount));
    }

    // Якщо є залишки, формуємо додаткові пари серед них рандомно
    if (leftoverTeams.length >= 2) {
      const shuffledLeftover = shuffleArray(leftoverTeams);
      for (let i = 0; i < shuffledLeftover.length - 1; i += 2) {
        matches.push({
          team1: shuffledLeftover[i],
          team2: shuffledLeftover[i + 1],
        });
      }
    } else if (leftoverTeams.length === 1) {
      // Якщо залишилася одна команда без пари, то можна або залишити її без матчу,
      // або додати логіку "bye" (перемога без гри), залежно від логіки турніру.
      // Тут просто залишаємо без пари.
      console.warn(
        "Одна команда залишилася без пари у тайбрейку:",
        leftoverTeams[0].name
      );
    }
  } else {
    // Якщо нема команд одного з гравців, просто рандомно формуємо пари зі всіх команд
    const shuffled = shuffleArray(teams);
    for (let i = 0; i < shuffled.length - 1; i += 2) {
      matches.push({ team1: shuffled[i], team2: shuffled[i + 1] });
    }
  }

  // Збереження в localStorage
  localStorage.setItem("tiebreakerMatches", JSON.stringify(matches));

  renderTiebreakMatches(matches);
}
function renderTiebreakMatches(matches) {
  const matchesContainer = document.getElementById("tiebreak-matches");
  matchesContainer.innerHTML = "";

  matches.forEach((match, index) => {
    const div = document.createElement("div");
    div.classList.add("match");
    div.innerHTML = `
      <div class="match-number">Тайбрейк ${index + 1}</div>
      <div class="match-teams">
        <div class="team">
          <img src="${match.team1.logo}" alt="${match.team1.name}">
          <span>${match.team1.name}</span>
        </div>
        <span class="vs">VS</span>
        <div class="team">
          <img src="${match.team2.logo}" alt="${match.team2.name}">
          <span>${match.team2.name}</span>
          </div>
      </div>
      <div class="match-actions">
        <button class="btn-win-tiebreak" data-winner="${
          match.team1.name
        }" data-loser="${match.team2.name}">Переможець: ${
      match.team1.name
    }</button>
        <button class="btn-win-tiebreak" data-winner="${
          match.team2.name
        }" data-loser="${match.team1.name}">Переможець: ${
      match.team2.name
    }</button>
      </div>
    `;
    matchesContainer.appendChild(div);
  });
}
document
  .getElementById("tiebreak-matches")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-win-tiebreak")) {
      const winner = event.target.dataset.winner;
      const loser = event.target.dataset.loser;

      updateTable(winner, loser); // Додає 1 перемогу, 3 очки
      markTiebreakWinner(event.target);

      saveTableToLocalStorage();
      saveTiebreakResults(winner, loser);
      checkIfTournamentFullyFinished(); // ✅ тут
    }
  });

function markTiebreakWinner(button) {
  const buttons = button.parentElement.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.style.cursor = "default";
    if (btn === button) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
      btn.dataset.winnerButton = "true"; // ✅ Додаємо це
    } else {
      btn.style.backgroundColor = "red";
      btn.style.color = "white";
    }
  });
}
function saveTiebreakResults(winner, loser) {
  const saved = JSON.parse(localStorage.getItem("tiebreakResults") || "[]");
  saved.push({ winner, loser });
  localStorage.setItem("tiebreakResults", JSON.stringify(saved));
}
function restoreTiebreakMatches() {
  const matches = JSON.parse(localStorage.getItem("tiebreakerMatches") || "[]");
  if (matches.length === 0) return;

  renderTiebreakMatches(matches);

  const results = JSON.parse(localStorage.getItem("tiebreakResults") || "[]");
  results.forEach(({ winner, loser }) => {
    // НЕ оновлюємо таблицю повторно!
    const matchDivs = document.querySelectorAll("#tiebreak-matches .match");
    results.forEach(({ winner, loser }) => {
      // НЕ оновлюємо таблицю повторно!
      const matchDivs = document.querySelectorAll("#tiebreak-matches .match");
      matchDivs.forEach((div) => {
        const btns = div.querySelectorAll(".btn-win-tiebreak");
        btns.forEach((btn) => {
          if (btn.dataset.winner === winner && btn.dataset.loser === loser) {
            btn.disabled = true;
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
            btn.dataset.winnerButton = "true";
          } else if (
            btn.dataset.winner === loser &&
            btn.dataset.loser === winner
          ) {
            btn.disabled = true;
            btn.style.backgroundColor = "red";
            btn.style.color = "white";
          }
        });
      });
    });
  });
  checkIfTournamentFullyFinished(); // ✅ тут
}
function getTiebreakerTeams() {
  const rows = document.querySelectorAll("#table-body tr");
  const tieTeams = [];

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const teamName = row.querySelector(".team-info span").textContent.trim();
    const teamLogo = row.querySelector(".team-info img").src;
    const playerLabel = row.querySelector(".player-label").textContent.trim();
    const points = parseInt(cells[5].textContent);

    if (points === 3) {
      tieTeams.push({
        name: teamName,
        player: playerLabel,
        logo: teamLogo, // ✅ додаємо logo
      });
    }
  });

  return tieTeams;
}
function checkIfTournamentFullyFinished() {
  const tiebreakSection = document.getElementById("tiebreak-section");
  const nextStageSection = document.getElementById("next-stage-section");

  const allMainMatchesPlayed = areAllMatchesPlayed();
  const tiebreakTeams = getTiebreakerTeams(); // ✅ важливо

  const tiebreakMatchesGenerated =
    document.querySelectorAll("#tiebreak-matches .match").length > 0;

  let allTiebreaksPlayed = true;

  if (tiebreakMatchesGenerated) {
    const tiebreakMatchDivs = document.querySelectorAll(
      "#tiebreak-matches .match"
    );
    allTiebreaksPlayed = [...tiebreakMatchDivs].every((div) =>
      div.querySelector('[data-winner-button="true"]')
    );
  }

  console.log("🔍 Перевірка завершення:");
  console.log("➡️ Всі основні матчі зіграні?", allMainMatchesPlayed);
  console.log("➡️ Тайбрейки потрібні?", tiebreakTeams.length >= 2);
  console.log("➡️ Тайбрейки згенеровані?", tiebreakMatchesGenerated);
  console.log("➡️ Всі тайбрейки зіграні? (data)", allTiebreaksPlayed);

  // ✅ Правильна умова:
  const showNextButton =
    allMainMatchesPlayed &&
    (tiebreakTeams.length < 2 ||
      (tiebreakMatchesGenerated && allTiebreaksPlayed));

  if (showNextButton) {
    console.log("✅ ПОКАЗУЄМО кнопку 1/8");
    nextStageSection.classList.remove("hidden");
  } else {
    console.log("❌ ХОВАЄМО кнопку 1/8");
    nextStageSection.classList.add("hidden");
  }
  const tiebreakGenerateBtn = document.getElementById("generate-tiebreak");

  if (showNextButton) {
    console.log("🔒 Блокуємо тайбрейк-генерацію");
    if (tiebreakGenerateBtn) {
      tiebreakGenerateBtn.disabled = true;
      tiebreakGenerateBtn.style.opacity = "0.5";
      tiebreakGenerateBtn.style.cursor = "not-allowed";
    }
  } else {
    console.log("🔓 Дозволяємо генерувати тайбрейк");
    if (tiebreakGenerateBtn) {
      tiebreakGenerateBtn.disabled = false;
      tiebreakGenerateBtn.style.opacity = "1";
      tiebreakGenerateBtn.style.cursor = "pointer";
    }
  }
  const tiebreakInfo = document.getElementById("tiebreak-info");

  if (tiebreakInfo) {
    if (!allMainMatchesPlayed) {
      tiebreakInfo.textContent =
        "⏳ Очікуємо завершення всіх матчів групового етапу...";
    } else if (tiebreakTeams.length >= 2 && !tiebreakMatchesGenerated) {
      tiebreakInfo.textContent =
        "🎯 Всі матчі зіграні. Є команди з 3 очками, потрібно провести тай-брейк.";
    } else if (
      tiebreakTeams.length >= 2 &&
      tiebreakMatchesGenerated &&
      !allTiebreaksPlayed
    ) {
      tiebreakInfo.textContent = "⚔️ Тай-брейк у процесі. Завершіть усі матчі.";
    } else {
      tiebreakInfo.textContent = "✅ Можна переходити до 1/8 фіналу.";
    }
  }
}

// document.getElementById("go-to-next-stage").addEventListener("click", () => {
//   goToStage("of16"); // бо goToStage сам додає "stage-"
// });
