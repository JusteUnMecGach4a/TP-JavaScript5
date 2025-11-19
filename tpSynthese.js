// Fichier: tpSynthese.js



/**
 * Fonction pour afficher le convertisseur en modifiant le DOM (innerHTML).
 * Elle injecte la structure HTML du formulaire dans la zone prévue.
 */
function affichageConvertisseur() {
    const htmlConvertisseur = `
        <div id="convertisseur">
            <form>
                <p>
                    <label for="euros">Euros (€) :</label>
                    <input type="text" id="euros" name="euros"> 
                    <input type="button" value="Euros -> Francs" onclick="franc()">
                </p>
                <p>
                    <label for="francs">Francs (FRF) :</label>
                    <input type="text" id="francs" name="francs">
                    <input type="button" value="Francs -> Euros" onclick="euro()">
                </p>
                <p>
                    <input type="reset" value="Reset"> 
                </p>
            </form>
        </div>

        <div id="affichageTable">
            <input type="button" 
                   value="Table de conversion" 
                   onclick="affichageNouvelleFenetre()">
        </div>
    `;

    // Injection du HTML dans la zone dédiée de la page principale
    document.getElementById('zone_injection_convertisseur').innerHTML = htmlConvertisseur;
    
    // Optionnel : Masquer le lien "Afficher le convertisseur" une fois qu'il est affiché
    // (Nécessite l'ID 'lien_convertisseur' ajouté dans le HTML)
    document.getElementById('lien_convertisseur').style.display = 'none';
}


/**
 * Fonction pour afficher la table de conversion dans une nouvelle fenêtre/onglet.
 * Elle génère tout le contenu HTML et CSS directement.
 */
function affichageNouvelleFenetre() {
    const TAUX = 6.55957;
    const MAX_VALEUR = 10; // Nombre de lignes dans la table (de 1 à 10 Euros)

    // Ouvre une nouvelle fenêtre. Le nom "TableConversion" garantit que si elle est déjà 
    // ouverte, le navigateur la réutilise au lieu d'en créer une nouvelle.
    const newWindow = window.open("", "TableConversion", "width=400,height=500");

    let htmlContent = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <title>Table de Conversion Euro-Francs</title>
            <style>
                /* ******** STYLES PERSONNALISÉS (Thème sombre + Bleu Turquoise) ********* */
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    padding: 20px;
                    background-color: #000000; /* Fond Noir */
                    color: #FFFFFF; /* Texte Blanc */
                }
                
                h1 {
                    color: #ffffffff; /* Bleu Turquoise (pour le contraste) */
                }
                
                table { 
                    width: 80%; 
                    margin: 20px auto; 
                    border-collapse: collapse;
                }
                
                th, td { 
                    border: 1px solid #ffffffff; /* Bordures en turquoise */
                    padding: 10px; 
                }
                
                th { 
                    background-color: #333333; /* Gris foncé pour l'en-tête */
                    color: #FFFFFF;
                }
                
                .euro-col { 
                    font-weight: bold; 
                }
                /* *************************************************************** */
            </style>
        </head>
        <body>
            <h1>Table de Conversion Euro-Francs</h1>
            <table>
                <thead>
                    <tr>
                        <th>Euros (€)</th>
                        <th>Francs (FRF)</th>
                    </tr>
                </thead>
                <tbody>
    `;

    // Boucle pour générer les lignes du tableau de 1 à MAX_VALEUR Euros
    for (let i = 1; i <= MAX_VALEUR; i++) {
        const euros = i;
        const francs = euros * TAUX;
        
        // Ajout d'une ligne au contenu HTML
        htmlContent += `
                    <tr>
                        <td class="euro-col">${euros.toFixed(2)}</td>
                        <td>${francs.toFixed(2)}</td>
                    </tr>
        `;
    }

    htmlContent += `
                </tbody>
            </table>
            <p>Taux : 1€ = ${TAUX} FRF</p>
        </body>
        </html>
    `;

    // Écrit le contenu HTML complet dans la nouvelle fenêtre
    newWindow.document.write(htmlContent);
    // Ferme le flux d'écriture pour forcer le rendu du document
    newWindow.document.close();
}