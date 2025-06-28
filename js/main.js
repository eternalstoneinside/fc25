const allTeams = [
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
  // Нові додані команди
  {
    name: "Aston Villa",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/Aston_Villa_logo.svg",
  },
  {
    name: "Girona",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/98/Girona_FC_logo.svg",
  },
  {
    name: "Borussia Dortmund",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
  },
  {
    name: "Inter Milan",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0b/Inter_Milan.svg",
  },
  {
    name: "Atletico Madrid",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  },
  {
    name: "Sevilla",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3c/Sevilla_FC_logo.svg",
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
    logo: "https://upload.wikimedia.org/wikipedia/en/c/c6/Olympique_Lyonnais.svg",
  },
  {
    name: "Ajax",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg",
  },
  {
    name: "Benfica",
    logo: "https://upload.wikimedia.org/wikipedia/en/8/89/SL_Benfica_logo.svg",
  },
  {
    name: "Porto",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg",
  },
  {
    name: "Villarreal",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/70/Villarreal_CF_logo.svg",
  },
  {
    name: "RB Leipzig",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg",
  },
  {
    name: "Everton",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
  },
  {
    name: "Fiorentina",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a5/ACF_Fiorentina_2.svg",
  },
  {
    name: "Lazio",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5c/S.S._Lazio_badge.svg",
  },
];

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
    const div = document.createElement("div");
    div.className = "team-item";
    div.innerHTML = `
      <div class="team-info">
        <img src="${team.logo}" alt="Логотип" width="40" height="40">
        <span>${team.name}</span>
      </div>
      <button ${
        isSelected ? "disabled style='opacity:0.5; cursor:not-allowed'" : ""
      }>Додати</button>
    `;
    const btn = div.querySelector("button");
    btn.addEventListener("click", () => addTeam(team));
    teamList.appendChild(div);
  });
}

function renderSelectedTeams() {
  selectedTeamsDiv.innerHTML = "";
  if (selectedTeams.length === 0) {
    selectedTeamsDiv.innerHTML = "<p>Немає обраних команд.</p>";
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
}

function removeTeam(teamName) {
  selectedTeams = selectedTeams.filter(
    (t) => normalizeName(t.name) !== normalizeName(teamName)
  );
  saveSelectedTeams();
  renderSelectedTeams();
  renderTeams(searchInput.value);
}

const removeAllTeamsBtn = document.getElementById("removeAllTeams");

removeAllTeamsBtn.addEventListener("click", () => {
  selectedTeams = []; // Очищаємо масив вибраних команд
  saveSelectedTeams(); // Зберігаємо у localStorage
  renderSelectedTeams(); // Оновлюємо відображення вибраних
  renderTeams(searchInput.value); // Оновлюємо список команд (щоб кнопки знову активувались)
});
function addTeam(team) {
  if (
    selectedTeams.some(
      (t) => normalizeName(t.name) === normalizeName(team.name)
    )
  ) {
    // Повідомлення прибране, просто виходимо
    return;
  }
  selectedTeams.push(team);
  saveSelectedTeams();
  renderSelectedTeams();
  renderTeams(searchInput.value);
}

searchInput.addEventListener("input", () => {
  renderTeams(searchInput.value);
});

function addRandomTeams() {
  // Перемішуємо копію масиву всіх команд
  const shuffled = [...allTeams].sort(() => Math.random() - 0.5);

  // Беремо перші 16
  const teamsToAdd = shuffled.slice(0, 16);

  // Замінюємо список обраних
  selectedTeams = teamsToAdd;

  // Зберігаємо та перемальовуємо
  saveSelectedTeams();
  renderSelectedTeams();
  renderTeams(searchInput.value);
}

// Ініціалізація
loadSelectedTeams();
renderTeams();
renderSelectedTeams();
document
  .getElementById("addRandomTeams")
  .addEventListener("click", addRandomTeams);
