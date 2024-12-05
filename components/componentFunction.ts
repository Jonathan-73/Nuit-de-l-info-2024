import { createElement } from "../src/elementFactory";

/**
 * Crée une bulle de texte de type bande dessinée
 * @param text - Le texte à afficher dans la bulle
 * @param position - Position relative à l'élément cible ("top", "right", "bottom", "left")
 * @returns HTMLElement représentant la bulle
 */
export function createBubble(text: string, position: "top" | "right" | "bottom" | "left" = "top"): HTMLElement {
    const bubble = createElement('div', { class: 'bubble' });
    bubble.textContent = text;

    // Positionnement de la bulle
    bubble.style.position = 'absolute';
    bubble.style[position] = 'calc(100% + 10px)'; // Décale la bulle dans la direction choisie

    return bubble;
}
