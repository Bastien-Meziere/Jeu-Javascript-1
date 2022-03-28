// Éléments du DOM
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

// Modèle de coeurs
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

// Fond
const bgFroid = 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(to right, #fa709a 0%, #fee140 100%)';
const bgBrulant = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)';
const bgLoose = 'linear-gradient(-20deg, #dcb0ed 0%, #99c99c 100%)';

// Jouer :
const play = () => {
    // Nombre aléatoire
    const randomNumber = Math.floor(Math.random() * 101);
    const totalVies = 8;
    let vies = totalVies;
    console.log(randomNumber);

    // Actualisation à chaque essai - Toute la logique du jeu
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        const valeurInput = parseInt(input.value);

        if(valeurInput < 0 || valeurInput > 100) return;

        if(valeurInput === randomNumber) {
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO ! Le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display = "block";
            essayerBtn.setAttribute("disabled", "");
        }

        if(valeurInput !== randomNumber) {
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3) {
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est brûlant !";
            } else if(randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6) {
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est chaud !";
            } else if(randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11) {
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est tiède !";
            } else {
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est froid";
            }

            vies--;
            verifyLoose();
        }

        actualiseCoeurs(vies);

    })

    const verifyLoose = () => {
        if(vies === 0) {
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute("disabled", "");
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }
    }

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++) {
            tableauDeVies.push(coeurPlein);
        }
        for(let i = 0; i < totalVies - vies; i++) {
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies);

    rejouerBtn.addEventListener('click', () => {
        message.style.display = 'none';
        document.location.reload(true);
    })
}

play();