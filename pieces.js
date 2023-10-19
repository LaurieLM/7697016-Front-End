import { ajoutListenersAvis, ajoutListenersEnvoyerAvis } from "./avis.js";

// Récupération des pièces éventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem("pieces");
if (pieces === null) {
    // Récupération des pièces depuis l’API HTTP 
    const reponse = await fetch("http://localhost:8081/pieces/");
    pieces = await reponse.json();
    // const pieces = await fetch("http://localhost:8081/pieces").then(pieces => pieces.json());

    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);

    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);
} else {
    pieces = JSON.parse(pieces);
}


ajoutListenersEnvoyerAvis();
//PIECES

function genererPieces(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        const article = pieces[i];
        const sectionFiches = document.querySelector(".fiches");
        const pieceElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = article.image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite === true ? "En stock" : "Rupture de stock";

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";

        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        pieceElement.appendChild(avisBouton);
    }
    ajoutListenersAvis();
}

genererPieces(pieces);

// BOUTONS //

const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
    // console.log(piecesOrdonnees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
boutonTrierDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
    // console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
    // console.log(piecesFiltrees);
});

const boutonDescription = document.querySelector(".btn-description");
boutonDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
    // console.log(piecesFiltrees)
});

// LISTE PIECES ABORDABLES

const noms = pieces.map(piece => piece.nom);
const abordablesElements = document.createElement("ul");

for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1)
    };
};
    
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement("li");
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
    document.querySelector('.abordables')
        .appendChild(abordablesElements)
}
    
// LISTE PIECES AVEC DESCRIPTIF

const prix = pieces.map(piece => piece.prix);
const stock = pieces.map(piece => piece.disponibilite);
const disponibleElements = document.createElement("ul");

for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].disponibilite === false) {
        stock.splice(i,1);
    }
}

for (let i = 0; i < stock.length; i++) {
    const disponibleElement = document.createElement("li");
    disponibleElement.innerText = `${noms[i]} - ${prix[i]} €`;
    disponibleElements.appendChild(disponibleElement);
    document.querySelector(".disponibles")
        .appendChild(disponibleElements)
}

// LISTE PIECES PRIX MAX

const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);  
})



















