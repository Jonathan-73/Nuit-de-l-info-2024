export class App {

    public elem = document.createElement("div");

    constructor(protected overlay: HTMLElement) {
        overlay.innerHTML = ''; // Clear existing content
        overlay.appendChild(this.elem);
        overlay.style.display = 'flex'; // Show overlay
    }

    protected done () {
        this.overlay.style.display = 'none';
        this.overlay.innerHTML = ''; // Clear content when overlay is closed
    }

}