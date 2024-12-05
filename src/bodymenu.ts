import { createElement } from "./elementFactory"

export interface BodyEntry {
    coordWidth: number
    coordHeight: number
    callBack: () => void
}
// let v: BodyEntry = {coordHeight: 1, coordWidth: 2, callBack: (a) => a}

export class BodyMenu {
    #root: HTMLElement
    #entries: BodyEntry[]

    constructor(entries: BodyEntry[]) {
        this.#root = createElement('div', { "id": "bodyMenu" })
        this.#entries = entries
    }

    getRoot(): HTMLElement {
        return this.#root
    }

}
