// ========= LocalStorage для результатів і поточного раунду =========
const STORAGE_RESULTS = "knockoutResults";
const STORAGE_STAGE = "currentStage";

function saveKnockoutResult(round, winner, loser) {
  const all = JSON.parse(localStorage.getItem(STORAGE_RESULTS) || "{}");
  all[round] = all[round] || [];
  all[round].push({ winner, loser });
  localStorage.setItem(STORAGE_RESULTS, JSON.stringify(all));
}

function restoreKnockout(sectionId) {
  const data =
    JSON.parse(localStorage.getItem(STORAGE_RESULTS) || "{}")[sectionId] || [];
  const container = document.getElementById(sectionId);

  data.forEach(({ winner, loser }) => {
    const matchDivs = container.querySelectorAll(".match");
    matchDivs.forEach((match) => {
      const btns = match.querySelectorAll(".btn-win");
      const btnWinner = Array.from(btns).find(
        (btn) => btn.dataset.winner === winner && btn.dataset.loser === loser
      );
      if (btnWinner) {
        btns.forEach((b) => (b.disabled = true));
        btnWinner.classList.add("win");
      }
    });
  });
}

// ========= Зчитуємо 8 команд із таблиці, включно з гравцем =========
function getQualifiedTeams() {
  return Array.from(document.querySelectorAll("#table-body tr"))
    .map((tr) => {
      const cells = tr.children; // усі <td> у цій стрічці
      // 1) Перша клітинка — .team-info із лого та ім’ям
      const info = cells[0].querySelector(".team-info");
      const name = info.querySelector("span").textContent.trim();
      const logo = info.querySelector("img").src;
      // 2) Друга клітинка — .player-label
      const player = cells[1].querySelector(".player-label").textContent.trim();
      // 3) Шоста клітинка — очки
      const points = parseInt(cells[5].textContent, 10);
      return { name, logo, player, points };
    })
    .filter((t) => t.points === 6);
}
// ========= Генерація пар =========
function seedMatches(teams) {
  // можна додати сортування за різницею мʼячів, зараз просто прямий посів
  return teams
    .sort((a, b) => 0)
    .reduce((acc, _, i, arr) => {
      if (i < arr.length / 2) acc.push([arr[i], arr[arr.length - 1 - i]]);
      return acc;
    }, []);
}

// ========= Рендер сітки =========
function renderBracket(sectionId, teams, nextCb) {
  const container = document.getElementById(sectionId);
  container.innerHTML = `<h3>${container.dataset.title}</h3>`;
  const bracket = document.createElement("div");
  bracket.className = "bracket";

  seedMatches(teams).forEach(([t1, t2], idx) => {
    const match = document.createElement("div");
    match.className = "match";
    match.innerHTML = `
      <div class="team">
        <img src="${t1.logo}" width="24"><span>${t1.name}</span>
        <span class="player-label player-1">${t1.player}</span>
      </div>
      <div class="match-actions">
        <button class="btn-win" data-winner="${t1.name}" data-loser="${t2.name}">
          Переможець: ${t1.name}
        </button>
        <button class="btn-win" data-winner="${t2.name}" data-loser="${t1.name}">
          Переможець: ${t2.name}
        </button>
      </div>
      <div class="team">
        <img src="${t2.logo}" width="24"><span>${t2.name}</span>
        <span class="player-label player-2">${t2.player}</span>
      </div>`;

    // обробка кліку — всередині renderBracket
    match.querySelectorAll(".btn-win").forEach((btn) => {
      btn.addEventListener("click", () => {
        const matchDiv = btn.closest(".match");

        // Якщо вже обрано — нічого не робимо
        if (matchDiv.querySelector(".btn-win[disabled]")) return;

        // Заблокуємо обидві кнопки
        matchDiv.querySelectorAll(".btn-win").forEach((b) => {
          b.disabled = true;
          b.classList.remove("win");
        });

        // Виділимо переможця
        btn.classList.add("win");

        // Зберегти
        saveKnockoutResult(sectionId, btn.dataset.winner, btn.dataset.loser);

        // Передати переможця далі
        const winnerTeam = teams.find((t) => t.name === btn.dataset.winner);
        nextCb(winnerTeam);
      });
    });

    bracket.appendChild(match);
  });

  container.appendChild(bracket);
  restoreKnockout(sectionId);
}

// ========= Керування етапами =========
let quarters = [],
  semis = [],
  finals = [];

function goToRound(round) {
  // зберігаємо чекпоінт
  localStorage.setItem(STORAGE_STAGE, round);

  document
    .querySelectorAll(".stage")
    .forEach((s) => s.classList.toggle("active", s.id === `stage-${round}`));
  if (round === "of16") {
    renderBracket("stage-of16", getQualifiedTeams(), (w) => {
      quarters.push(w);
      if (quarters.length === 4) goToRound("quarter");
    });
  }
  if (round === "quarter") {
    renderBracket("stage-quarter", quarters, (w) => {
      semis.push(w);
      if (semis.length === 2) goToRound("semi");
    });
  }
  if (round === "semi") {
    renderBracket("stage-semi", semis, (w) => {
      finals.push(w);
      if (finals.length === 1) goToRound("final");
    });
  }
  if (round === "final") {
    renderBracket("stage-final", finals, (w) => {
      alert(`🏆 Переможець турніру: ${w.name}`);
    });
  }
}

document
  .getElementById("go-to-next-stage")
  .addEventListener("click", () => goToRound("of16"));

// ========= При завантаженні сторінки =========
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(STORAGE_STAGE);
  if (saved) {
    // якщо щось уже згенеровано — кидаємося одразу туди
    goToRound(saved);
  }
});
