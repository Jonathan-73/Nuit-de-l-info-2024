import "../css/composition.css"
import { App } from "./app";

export class CompositionApp extends App {

    constructor(overlay: HTMLElement) {
        super(overlay)

        createCompositionDiv(this.elem, () => this.done());

    }

}

function createCompositionDiv(newDiv: HTMLElement, close: () => void){

    const description = `
    <div class="composition-game">
        <h1 class="titreCompo">Composition chimique des humains et de l'océan</h1>
        <br>
        <div class="grid-container">
            <div class="grid-item" data-zone="Le corps humain est composé à 65% d'oxygène, pour l'océan c'est plus de 85%"><p>Oxygène</p></div>
            <div class="grid-item" data-zone="Le corps humain est composé à 18% de carbone, cela tombe à 0,00245% pour l'océan"><p>Carbone</p></div>
            <div class="grid-item" data-zone="10% d'hydrogène pour le corps humain et l'océan"><p>Hydrogène</p></div>
            <div class="grid-item" data-zone="1,5% de calcium dans le corps humain contre 0,041% dans les océans"><p>Calcium</p></div>
            <div class="grid-item" data-zone="0,09% de soufre dans l'océan et 0,25% chez les humains"><p>Soufre</p></div>
            <div class="grid-item" data-zone="0,04% de potassium dans l'océan et 0,2% dans le corps humain"><p>Potassium</p></div>
            <div class="grid-item" data-zone="1,9% de chlore dans l'océan pour 0,15% pour le corps humain"><p>Chlore</p></div>
            <div class="grid-item" data-zone="1% de sodium dans l'océan et 0,25% chez les humains"><p>Sodium</p></div>
            <div class="grid-item" data-zone="0,12% de magnésium dans les océans et 0,05% dans le corps humain"><p>Magnésium</p></div>
        </div>
            <p id="zone-info" >Choisissez une zone pour découvrir les similitudes entre la composition chimique du corps humain et celle de l'océan</p>
            <button class="finish-btn text-white bg-blue-700 font-semibold p-2.5 rounded-md hover:bg-blue-600 active:bg-blue-800">Terminer</button>
        </div>
    `
    newDiv.innerHTML = (description);

    const gridItems = newDiv.querySelectorAll('.grid-item');
    const zoneInfo = newDiv.querySelector('#zone-info');
    const finishButton = newDiv.querySelector('.finish-btn');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const zoneName = item.getAttribute('data-zone');
            zoneInfo!.textContent = `${zoneName}`;
            item.classList.toggle('green');
        });
    });

    finishButton!.addEventListener('click', () => {
        close();
    });

    return newDiv;
}
