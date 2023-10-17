// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];

    const sectionFiches = document.querySelector(".fiches");
    const pieceElement = document.createElement("article");
    const imageElement = document.createElement("img");
    imageElement.src = pieces[i].image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = pieces[i].nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix : ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)"; 
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = pieces[i].description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = pieces[i].disponibilite === true ? "En stock" : "Rupture de stock";

    sectionFiches.appendChild(pieceElement);
    sectionFiches.appendChild(imageElement);
    sectionFiches.appendChild(nomElement);
    sectionFiches.appendChild(prixElement);
    sectionFiches.appendChild(categorieElement);
    sectionFiches.appendChild(descriptionElement);
    sectionFiches.appendChild(stockElement);
    }





