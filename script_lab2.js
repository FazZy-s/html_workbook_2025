const API_GLOBAL = "https://disease.sh/v3/covid-19/all";
const API_COUNTRIES = "https://disease.sh/v3/covid-19/countries";

const totalCasesEl = document.getElementById("totalCases");
const totalDeathsEl = document.getElementById("totalDeaths");
const totalRecoveredEl = document.getElementById("totalRecovered");
const totalActiveEl = document.getElementById("totalActive");
const searchInput = document.getElementById("searchInput");
const countriesBody = document.getElementById("countriesBody");
const refreshBtn = document.getElementById("refreshBtn");

let countriesData = [];


const map = L.map("map", {
  worldCopyJump: true,
  maxBoundsViscosity: 0,
  inertia: true,
  inertiaDeceleration: 2000
}).setView([20, 0], 2);


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  noWrap: false,
  continuousWorld: true
}).addTo(map);

const markersLayer = L.layerGroup().addTo(map);

function n(x) { return x.toLocaleString(); }


async function loadData() {
  markersLayer.clearLayers();

  const [resG, resC] = await Promise.all([
    fetch(API_GLOBAL),
    fetch(API_COUNTRIES)
  ]);

  const global = await resG.json();
  countriesData = await resC.json();

  totalCasesEl.textContent = n(global.cases);
  totalDeathsEl.textContent = n(global.deaths);
  totalRecoveredEl.textContent = n(global.recovered);
  totalActiveEl.textContent = n(global.active);

  countriesData.sort((a, b) => b.cases - a.cases);
  renderTable(countriesData);

  countriesData.forEach(c => {
    if (!c.countryInfo.lat) return;

    const radius = Math.sqrt(c.cases) / 200;

    L.circleMarker([c.countryInfo.lat, c.countryInfo.long], {
      radius,
      color: "#2563eb",
      fillColor: "#3b82f6",
      fillOpacity: 0.45
    })
    .bindPopup(`
      <strong>${c.country}</strong><br>
      Cases: ${n(c.cases)}<br>
      Deaths: ${n(c.deaths)}<br>
      Active: ${n(c.active)}
    `)
    .addTo(markersLayer);
  });
}


function renderTable(list) {
  countriesBody.innerHTML = list.map(c => `
    <tr>
      <td>${c.country}</td>
      <td>${n(c.cases)}</td>
      <td>${n(c.deaths)}</td>
      <td>${n(c.active)}</td>
    </tr>
  `).join("");
}


searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  renderTable(
    countriesData.filter(c => c.country.toLowerCase().includes(q))
  );
});

refreshBtn.onclick = loadData;

loadData();
