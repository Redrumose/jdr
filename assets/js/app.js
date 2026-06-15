// Récupération paramètre ?id= dans l'URL
function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Chargement des personnages
async function chargerPersos() {
  const res = await fetch('data/personnages.json');
  const persos = await res.json();
  const container = document.getElementById('listePersos');
  if (!container) return;

  container.innerHTML = persos.map(p => `
    <div class="carte">
      <h2>${p.nom}</h2>
      <p><strong>Classe :</strong> ${p.classe}</p>
      <p><strong>Niveau :</strong> ${p.niveau}</p>
      <a class="btn" href="personnage.html?id=${p.id}">Voir la fiche</a>
    </div>
  `).join('');
}

// Fiche personnage
async function chargerFichePerso() {
  const id = getIdFromUrl();
  const box = document.getElementById('fichePerso');
  if (!box || !id) return;

  const res = await fetch('data/personnages.json');
  const persos = await res.json();
  const perso = persos.find(p => String(p.id) === String(id));

  if (!perso) {
    box.innerHTML = '<p>Personnage introuvable.</p>';
    return;
  }

  box.innerHTML = `
    <h1>${perso.nom}</h1>
    <p><strong>Classe :</strong> ${perso.classe}</p>
    <p><strong>Niveau :</strong> ${perso.niveau}</p>
    <p><strong>Description :</strong> ${perso.description}</p>
    <p><strong>Historique :</strong> ${perso.historique || '—'}</p>
    <a class="btn" href="personnages.html">Retour à la liste</a>
  `;
}

// Scénarios
async function chargerScenarios() {
  const res = await fetch('data/scenarios.json');
  const scenarios = await res.json();
  const container = document.getElementById('listeScenarios');
  if (!container) return;

  container.innerHTML = scenarios.map(s => `
    <div class="carte">
      <h2>${s.titre}</h2>
      <p><strong>Campagne :</strong> ${s.campagne}</p>
      <p><strong>Statut :</strong> ${s.statut}</p>
      <a class="btn" href="scenario.html?id=${s.id}">Voir le scénario</a>
    </div>
  `).join('');
}

// Fiche scénario
async function chargerFicheScenario() {
  const id = getIdFromUrl();
  const box = document.getElementById('ficheScenario');
  if (!box || !id) return;

  const res = await fetch('data/scenarios.json');
  const scenarios = await res.json();
  const s = scenarios.find(x => String(x.id) === String(id));

  if (!s) {
    box.innerHTML = '<p>Scénario introuvable.</p>';
    return;
  }

  box.innerHTML = `
    <h1>${s.titre}</h1>
    <p><strong>Campagne :</strong> ${s.campagne}</p>
    <p><strong>Statut :</strong> ${s.statut}</p>
    <p><strong>Synopsis :</strong> ${s.synopsis}</p>
    <p><strong>Notes MJ :</strong> ${s.notes_mj || '—'}</p>
    <a class="btn" href="scenarios.html">Retour à la liste</a>
  `;
}

// Notes
async function chargerNotes() {
  const res = await fetch('data/notes.json');
  const notes = await res.json();
  const container = document.getElementById('listeNotes');
  if (!container) return;

  container.innerHTML = notes.map(n => `
    <div class="note">
      <h3>Session du ${n.date}</h3>
      <p><strong>Scénario :</strong> ${n.scenario}</p>
      <p>${n.contenu}</p>
    </div>
  `).join('');
}

// Connexion (maquette)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Connexion simulée (maquette).');
    window.location.href = 'index.html';
  });
}

// Initialisation selon la page
window.addEventListener('DOMContentLoaded', () => {
  chargerPersos();
  chargerFichePerso();
  chargerScenarios();
  chargerFicheScenario();
  chargerNotes();
});
