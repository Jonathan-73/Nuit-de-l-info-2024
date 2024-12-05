import {createElement} from "./elementFactory"

export class BodyMenu {
    #root: HTMLElement

    constructor() {
        this.#root = createElement('div', {"id": "bodyMenu"})
    }

    getRoot(): HTMLElement {
        return this.#root
    }
}
