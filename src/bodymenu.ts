import { createElement } from "./elementFactory";
import { createBubble } from "../components/componentFunction"; // Import de la méthode depuis components/

export interface BodyEntry {
    widthRatio: number;
    heightRatio: number;
    callback: () => void;
    tooltip?: string; // Nouveau : texte à afficher dans la bulle
}

export class BodyMenu {
    #root: HTMLElement;
    #entries: BodyEntry[];

    constructor(entries: BodyEntry[]) {
        this.#root = createElement('div', { id: "bodyMenu" });
        this.#entries = entries;

        // Background
        this.#root.insertAdjacentElement(
            "afterbegin",
            createElement('div', {
                style: 'width: 100px; height: 100px; background-color: lightgrey;',
            })
        );

        // Navigation
        let navigationLayer = createElement('div', { id: 'navigationLayer' });
        this.#root.insertAdjacentElement('beforeend', navigationLayer);

        for (const entry of this.#entries) {
            let button = createElement('button', {
                class: 'MenuEntryRoot',
                style: `--width-ratio: ${entry.widthRatio}; --height-ratio: ${entry.heightRatio};`,
                type: 'button',
            });
            button.addEventListener('click', entry.callback);
        
            // Créer la bulle si un tooltip est défini
            if (entry.tooltip) {
                let bubble = createBubble(entry.tooltip, "top"); // Bulle positionnée au-dessus du bouton
                this.#root.appendChild(bubble);
        
                // Afficher/Masquer la bulle au survol du bouton
                button.addEventListener('mouseover', () => bubble.classList.add('active'));
                button.addEventListener('mouseout', () => bubble.classList.remove('active'));
            }
        
            navigationLayer.insertAdjacentElement('beforeend', button);
        }
    }

    getRoot(): HTMLElement {
        return this.#root;
    }
}
