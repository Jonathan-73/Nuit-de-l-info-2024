import { gsap } from "gsap";

// Animation de la barre et des étapes
document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector("#progress") as HTMLElement;
    const stepText = document.querySelector("#step-text") as HTMLElement;
    const startButton = document.querySelector("#start-animation") as HTMLElement;
    const visualElements = document.querySelector("#visual-elements") as HTMLElement;
  
    // Éléments visuels
    const co2Element = document.querySelector("#co2") as HTMLElement;
    const lightElement = document.querySelector("#light") as HTMLElement;
    const planktonElement = document.querySelector("#plankton") as HTMLElement;
    const o2Element = document.querySelector("#o2") as HTMLElement;
  
    // Animation des étapes
    function step1() {
      stepText.textContent = "Étape 1 : CO₂ entre dans l'eau";
      gsap.to(progressBar, { width: "30%", backgroundColor: "red", duration: 2 });
  
      // Affiche CO2
      gsap.to(visualElements, { opacity: 1, duration: 1 });
      gsap.to(co2Element, { opacity: 1, scale: 1, duration: 1 });
      setTimeout(step2, 3000);
    }
  
    function step2() {
      stepText.textContent = "Étape 2 : Absorption de la lumière";
      gsap.to(progressBar, { width: "60%", backgroundColor: "yellow", duration: 2 });
  
      // Masque CO2, affiche la lumière
      gsap.to(co2Element, { opacity: 0, scale: 0, duration: 1 });
      gsap.to(lightElement, { opacity: 1, scale: 1, duration: 1 });
      setTimeout(step3, 3000);
    }
  
    function step3() {
      stepText.textContent = "Étape 3 : Plancton agit pendant la nuit";
      gsap.to(progressBar, { width: "70%", backgroundColor: "purple", duration: 2 });
  
      // Masque lumière, affiche plancton
      gsap.to(lightElement, { opacity: 0, scale: 0, duration: 1 });
      gsap.to(planktonElement, { opacity: 1, scale: 1, duration: 1 });
      setTimeout(step4, 3000);
    }
  
    function step4() {
      stepText.textContent = "Étape 4 : Cycle jour - O₂ produit";
      gsap.to(progressBar, { width: "90%", backgroundColor: "blue", duration: 2 });
  
      // Masque plancton, affiche O2
      gsap.to(planktonElement, { opacity: 0, scale: 0, duration: 1 });
      gsap.to(o2Element, { opacity: 1, scale: 1, duration: 1 });
      setTimeout(step5, 3000);
    }
  
    function step5() {
      stepText.textContent = "Étape 5 : Libération d'O₂";
      gsap.to(progressBar, { width: "100%", backgroundColor: "green", duration: 3 });
    }
  
    // Gestion du clic sur le bouton pour démarrer l'animation
    startButton.addEventListener("click", () => {
      startButton.style.display = "none"; // Cacher le bouton
      step1(); // Lancer l'animation
    });
});
