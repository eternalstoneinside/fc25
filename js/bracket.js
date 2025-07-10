// ========= LocalStorage для результатів і поточного раунду =========
const STORAGE_RESULTS = "knockoutResults";
const STORAGE_STAGE = "currentStage";

function saveKnockoutResult(stage, winner, loser) {
  const data = JSON.parse(localStorage.getItem("knockoutResults") || "{}");

  if (!data[stage]) data[stage] = [];

  const exists = data[stage].some(
    (m) => m.winner === winner && m.loser === loser
  );
  if (!exists) {
    data[stage].push({ winner, loser });
    localStorage.setItem("knockoutResults", JSON.stringify(data));
  }
}
function getTeamByName(name) {
  const all = JSON.parse(
    localStorage.getItem("stage-quarter-matches") || "[]"
  ).flatMap((m) => [m.team1, m.team2]);
  return all.find((t) => t.name === name);
}
function restoreKnockout(stageId) {
  const results = JSON.parse(localStorage.getItem("knockoutResults") || "{}");
  const saved = results[stageId] || [];

  const container = document.getElementById(stageId);
  const bracket = container.querySelector(".bracket");
  if (!bracket) return;

  const allMatches = Array.from(bracket.querySelectorAll(".match"));

  saved.forEach(({ winner, loser }) => {
    allMatches.forEach((match) => {
      const btns = match.querySelectorAll(".btn-win");
      btns.forEach((btn) => {
        if (btn.dataset.winner === winner && btn.dataset.loser === loser) {
          btn.disabled = true;
          btn.classList.add("winner");
          btn.style.backgroundColor = "green";
          btn.style.color = "white";
          btn.textContent = `Переможець: ${btn.dataset.winner}`;
          btn.dataset.winnerButton = "true";
          const winnerTeam = getTeamByName(winner);

          if (winnerTeam && stageId === "stage-quarter") {
            if (!semis.some((t) => t.name === winnerTeam.name)) {
              semis.push(winnerTeam);
            }
          }
          if (winnerTeam && stageId === "stage-semi") {
            if (!finals.some((t) => t.name === winnerTeam.name)) {
              finals.push(winnerTeam);
            }
          }
        } else if (
          btn.dataset.winner === loser &&
          btn.dataset.loser === winner
        ) {
          btn.disabled = true;
          btn.classList.add("loser");
          btn.style.backgroundColor = "red";
          btn.style.color = "white";
          btn.textContent = `Програвший: ${btn.dataset.winner}`;
        }
      });
    });
  });
}

// ========= Зчитуємо 8 команд із таблиці, включно з гравцем =========
function getQualifiedTeams() {
  return Array.from(document.querySelectorAll("#table-body tr"))
    .map((tr) => {
      const cells = tr.children;
      const info = cells[0].querySelector(".team-info");
      const name = info.querySelector("span").textContent.trim();
      const logo = info.querySelector("img").src;
      let player = cells[1].querySelector(".player-label").textContent.trim();
      if (player.includes("1")) player = "Гравець 1";
      else if (player.includes("2")) player = "Гравець 2";
      const points = parseInt(cells[5].textContent, 10);
      return { name, logo, player, points };
    })
    .sort((a, b) => b.points - a.points)
    .slice(0, 8); // ✅ беремо топ-8 незалежно від очок
}
// ========= Генерація пар =========
function seedMatches(teams) {
  const g1 = teams.filter((t) =>
    t.player.replace(/\s/g, "").toLowerCase().includes("гравець1")
  );
  const g2 = teams.filter((t) =>
    t.player.replace(/\s/g, "").toLowerCase().includes("гравець2")
  );

  const shuffledG1 = g1.sort(() => Math.random() - 0.5);
  const shuffledG2 = g2.sort(() => Math.random() - 0.5);

  const pairs = [];

  // Сформувати перехресні пари
  while (shuffledG1.length > 0 && shuffledG2.length > 0) {
    const t1 = shuffledG1.pop();
    const t2 = shuffledG2.pop();
    pairs.push([t1, t2]);
  }

  // Якщо залишилися ще команди у когось — просто між собою
  const leftovers = [...shuffledG1, ...shuffledG2];
  while (leftovers.length >= 2) {
    pairs.push([leftovers.pop(), leftovers.pop()]);
  }

  return pairs;
}

// ========= Рендер сітки =========
function renderBracket(stageId, teams, nextCb) {
  const container = document.getElementById(stageId);
  container.innerHTML = `<h3>${container.dataset.title}</h3>`;
  const bracket = document.createElement("div");
  bracket.className = "bracket";

  // Перевірка: чи вже є збережені пари матчів
  const savedMatchesRaw = localStorage.getItem(`${stageId}-matches`);
  const savedMatches = savedMatchesRaw ? JSON.parse(savedMatchesRaw) : null;

  const matches = savedMatches
    ? savedMatches.map(({ team1, team2 }) => [team1, team2])
    : seedMatches(teams);

  const savedToStore = []; // щоб записати тільки якщо треба

  matches.forEach(([t1, t2], idx) => {
    const match = document.createElement("div");
    match.className = "match match-bracket";
    match.innerHTML = `
      <div class="team team-style">
        <img src="${t1.logo}" width="24"><span>${t1.name}</span>
        <span class="player-label ${
          t1.player.includes("2") ? "player-2" : "player-1"
        }">${t1.player}</span>
      </div>
      <div class="match-bracket-actions">
        <button class="btn-win" data-winner="${t1.name}" data-loser="${
      t2.name
    }">
          Переможець: ${t1.name}
        </button>
        ${
          t1.player === t2.player
            ? `<div class="internal-match-label">(внутрішній матч)</div>`
            : ""
        }
        <button class="btn-win" data-winner="${t2.name}" data-loser="${
      t1.name
    }">
          Переможець: ${t2.name}
        </button>
      </div>
      <div class="team team-style">
        <img src="${t2.logo}" width="24"><span>${t2.name}</span>
        <span class="player-label ${
          t2.player.includes("2") ? "player-2" : "player-1"
        }">${t2.player}</span>
      </div>
    `;

    // Зберігаємо пару в масив
    savedToStore.push({ team1: t1, team2: t2 });

    // Обробка кліку
    match.querySelectorAll(".btn-win").forEach((btn) => {
      btn.addEventListener("click", () => {
        const matchDiv = btn.closest(".match");
        if (matchDiv.querySelector(".btn-win[disabled]")) return;

        const winnerName = btn.dataset.winner;

        matchDiv.querySelectorAll(".btn-win").forEach((b) => {
          b.disabled = true;
          b.classList.remove("winner", "loser");
          b.style.cursor = "not-allowed";

          const isWinner = b.dataset.winner === winnerName;

          if (isWinner) {
            b.classList.add("winner");
            b.dataset.winnerButton = "true";
            b.textContent = `Переможець: ${b.dataset.winner}`;
          } else {
            b.classList.add("loser");
            b.textContent = `Програвший: ${b.dataset.winner}`;
          }
        });

        saveKnockoutResult(stageId, btn.dataset.winner, btn.dataset.loser);
        const winnerTeam = teams.find((t) => t.name === btn.dataset.winner);
        nextCb(winnerTeam);
      });
    });

    bracket.appendChild(match);
  });

  // ✅ Зберігаємо тільки якщо згенерували вперше
  if (!savedMatches) {
    localStorage.setItem(`${stageId}-matches`, JSON.stringify(savedToStore));
  }

  container.appendChild(bracket);
  restoreKnockout(stageId); // Відновлення після оновлення
}

// ========= Керування етапами =========
let quarters = [],
  semis = [],
  finals = [];

function goToRound(round) {
  localStorage.setItem("currentStage", round);

  document
    .querySelectorAll(".stage")
    .forEach((s) => s.classList.toggle("active", s.id === `stage-${round}`));

  const storedResults = JSON.parse(
    localStorage.getItem(STORAGE_RESULTS) || "{}"
  )[`stage-${round}`];

  if (round === "quarter") {
    const savedMatches = JSON.parse(
      localStorage.getItem("stage-quarter-matches") || "[]"
    );

    if (savedMatches.length > 0) {
      // 🔄 Відновлюємо матчі по збережених парах
      const teamsFromMatches = [];
      savedMatches.forEach(({ team1, team2 }) => {
        teamsFromMatches.push(team1);
        teamsFromMatches.push(team2);
      });

      semis = [];
      renderBracket("stage-quarter", teamsFromMatches, (w) => {
        semis.push(w);
        if (semis.length === 4) goToRound("semi");
      });
    } else {
      // 🔁 Якщо нічого не збережено — генеруємо з таблиці
      quarters = getQualifiedTeams();
      semis = [];
      renderBracket("stage-quarter", quarters, (w) => {
        semis.push(w);
        if (semis.length === 4) goToRound("semi");
      });
    }
  }

  if (round === "semi") {
    const savedMatches = JSON.parse(
      localStorage.getItem("stage-semi-matches") || "[]"
    );

    if (savedMatches.length > 0) {
      const teamsFromMatches = savedMatches.flatMap(({ team1, team2 }) => [
        team1,
        team2,
      ]);
      finals = [];
      renderBracket("stage-semi", teamsFromMatches, (w) => {
        finals.push(w);
        if (finals.length === 2) goToRound("final");
      });
    } else {
      finals = [];
      renderBracket("stage-semi", semis, (w) => {
        finals.push(w);
        if (finals.length === 2) goToRound("final");
      });
    }
  }

  if (round === "final") {
    const savedMatches = JSON.parse(
      localStorage.getItem("stage-final-matches") || "[]"
    );

    const teamsFromMatches = savedMatches.flatMap(({ team1, team2 }) => [
      team1,
      team2,
    ]);

    renderBracket(
      "stage-final",
      teamsFromMatches.length > 0 ? teamsFromMatches : finals,
      () => {}
    );
  }
}
function areAllStageMatchesPlayed(stageId) {
  const results = JSON.parse(localStorage.getItem("knockoutResults") || "{}");
  const stageResults = results[stageId] || [];
  const savedMatches = JSON.parse(
    localStorage.getItem(`${stageId}-matches`) || "[]"
  );
  return stageResults.length === savedMatches.length;
}
document.getElementById("go-to-next-stage").addEventListener("click", () => {
  localStorage.setItem("activeStage", "quarter");
  goToRound("quarter"); // 🔁 Замість of16
});

document.addEventListener("DOMContentLoaded", () => {
  const stages = ["stage-quarter", "stage-semi", "stage-final"];

  stages.forEach((stageId) => {
    const savedMatches = localStorage.getItem(`${stageId}-matches`);
    if (savedMatches) {
      const teams = JSON.parse(savedMatches).map((m) => [m.team1, m.team2]);
      renderBracket(
        stageId,
        teams.flatMap((pair) => pair),
        (winner) => {
          console.log("Передати далі", winner.name);
        }
      );
    }
  });
});
