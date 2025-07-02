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
