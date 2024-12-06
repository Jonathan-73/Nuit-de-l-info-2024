import { gsap } from "gsap";

// Animation de la barre et des étapes
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("#start-animation") as HTMLElement;
    const progressBar = document.querySelector("#progress") as HTMLElement;
    const stepText = document.querySelector("#step-text") as HTMLElement;
    const visualElements = document.querySelector("#visual-elements") as HTMLElement;
    const skinElement = document.querySelector("#skin") as HTMLElement;
  
    // Éléments visuels
    const co2Element = document.querySelector("#co2") as HTMLElement;
    const o2Element = document.querySelector("#o2") as HTMLElement;
    const bloodElement = document.querySelector("#blood") as HTMLElement;
    const lungsElement = document.querySelector("#lungs") as HTMLElement;

    const expirationElement = document.querySelector("#expiration") as HTMLElement;
    const inspirationElement = document.querySelector("#inspiration") as HTMLElement;

    var elementHeight = 0;
    
    function toggleInspiration(isInspiring: boolean) {
        if (isInspiring) {
          gsap.to(expirationElement, { opacity: 1, duration: 1 });
          gsap.to(inspirationElement, { opacity: 0, duration: 1 });
          document.body.style.background = "linear-gradient(to bottom, #0078d4, #004466)";
        } else {
          gsap.to(expirationElement, { opacity: 0, duration: 1 });
          gsap.to(inspirationElement, { opacity: 1, duration: 1 });
          document.body.style.background = "linear-gradient(to bottom, #001f33, #000000)";
        }
      }
  
    // Animation des étapes
    function step1(elementHeight: number) {
        toggleInspiration(true);
        stepText.textContent = "Inspiration 🌬️ : L'air entre dans les poumons";
        gsap.to(progressBar, { width: "0%", backgroundColor: "orange", duration: 3 });
        const yMovement = elementHeight * 0.3;
        const basePositionCo2 = elementHeight * 0.2;
        const basePositionO2 = elementHeight * 0.1;

        // Animation des flèches
        gsap.set("#arrow-o2", { y: basePositionO2 });
        gsap.set("#arrow-co2", { y: basePositionCo2 });

        gsap.to("#arrow-o2", { opacity: 1, y:  basePositionCo2 + yMovement, repeat: 1, duration: 1.5, onComplete: () => {
            gsap.to("#arrow-o2", { opacity: 0, duration: 1 });
        }});
        gsap.to("#arrow-co2", { opacity: 1, y: basePositionO2 - yMovement, repeat: 1, duration: 1.5, onComplete: () => {
            gsap.to("#arrow-co2", { opacity: 0, duration: 1 });
        }});
        gsap.to(visualElements, { opacity: 1, duration: 1 });
        setTimeout(() => step2(basePositionCo2 + yMovement), 4000);
    }
  
    function step2(elementHeight: number) {
      stepText.textContent = "L'oxygène (O₂) est absorbé par le sang 🩸";
      gsap.to(progressBar, { width: "40%", backgroundColor: "yellow", duration: 2 });
      gsap.to(lungsElement, { opacity: 1, scale: 1, duration: 1 });  
      gsap.to(visualElements, { opacity: 1, duration: 3 });
    
      gsap.to(bloodElement, { opacity: 1, scale: 1, duration: 1 });
      gsap.set(o2Element, { y: elementHeight * 0.7, opacity: 1, scale: 1 });
      setTimeout(step3, 3000);
    }
  
    function step3() {
      toggleInspiration(false);
      stepText.textContent = "Étape 3 : Échange gazeux : O₂ échangé contre CO₂";
      gsap.to(progressBar, { width: "50%", backgroundColor: "purple", duration: 2 });
  
      // Masque lumière, affiche plancton
      gsap.to(bloodElement, { opacity: 0, scale: 0, duration: 1 });
      gsap.to(lungsElement, { opacity: 1, scale: 1, duration: 1 });
      setTimeout(step4, 3000);
    }
  
    function step4() {
      toggleInspiration(true);
      stepText.textContent = "Étape 4 : Expiration 💨 : Le dioxyde de carbone (CO₂) est expulsé";
      gsap.to(bloodElement, { opacity: 1, scale: 1, duration: 1 });

      gsap.to(progressBar, { width: "70%", backgroundColor: "blue", duration: 2 });
  
      // Masque plancton, affiche O2
      gsap.to(lungsElement, { opacity: 0, scale: 0, duration: 1 });
      gsap.set(o2Element, { opacity: 0, scale: 1, duration: 1 });
      setTimeout(step5, 2000);
    }   
  
    function step5() {
      stepText.textContent = "Étape 5 : Cycle complet terminé, respiration réussie ";
      gsap.to(co2Element, { opacity: 1, scale: 1, duration: 1 });
      gsap.to(progressBar, { width: "100%", backgroundColor: "green", duration: 2 });
    }
  
    // Gestion du clic sur le bouton pour démarrer l'animation
    startButton.addEventListener("click", () => {
      startButton.style.display = "none"; // Cacher le bouton
      const startAnimationRect = visualElements.getBoundingClientRect();
      const elementHeight = startAnimationRect.height; // Hauteur de l'élément
      step1(elementHeight); // Lancer l'animation
    });
});
