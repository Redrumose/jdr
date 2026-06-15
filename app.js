async function chargerPersos() {
  const res = await fetch("data/personnages.json");
  const persos = await res.json();

  const container = document.getElementById("listePersos");
  container.innerHTML = persos.map(p => `
    <div class="carte">
      <h3>${p.nom}</h3>
      <p>Classe : ${p.classe}</p>
      <p>Niveau : ${p.niveau}</p>
      <a href="personnage.html?id=${p.id}" class="btn">Voir fiche</a>
    </div>
  `).join("");
}

if (document.getElementById("listePersos")) chargerPersos();
