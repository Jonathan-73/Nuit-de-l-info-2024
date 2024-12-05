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

        // Background
        this.#root.insertAdjacentElement("afterbegin", createElement('div', { 'style': 'width: 100px; height: 100px; background-color: lightgrey;' }))

        // Navigation
        let navigationLayer = createElement('div', { 'id': 'navigationLayer' })
        this.#root.insertAdjacentElement("beforeend", navigationLayer)

        for (const entry of this.#entries)
            navigationLayer.insertAdjacentElement('beforeend', createElement('div', { 'class': 'MenuEntryRoot', 'style': `--width-ratio: ${entry.coordWidth}; --height-ratio: ${entry.coordHeight};` }))
    }

    getRoot(): HTMLElement {
        return this.#root
    }

}
