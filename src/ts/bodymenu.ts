import { createElement } from "./elementFactory"

export interface BodyEntry {
    widthRatio: number
    heightRatio: number
    callback: () => void
}
// let bodyEntry: BodyEntry = {coordHeight: 1, coordWidth: 2, callBack: (a) => a}

export class BodyMenu {
    #root: HTMLElement
    #entries: BodyEntry[]

    constructor(entries: BodyEntry[]) {
        this.#root = createElement('div', { id: "bodyMenu" })
        this.#entries = entries

        // Background
        this.#root.insertAdjacentElement("afterbegin", createElement('div', { style: 'width: 400px; height: 400px; background-color: lightgrey;' }))

        // Navigation
        let navigationLayer = createElement('div', { id: 'navigationLayer' })
        this.#root.insertAdjacentElement("beforeend", navigationLayer)

        for (const entry of this.#entries) {
            let button = createElement('button', { class: 'MenuEntryRoot', style: `--width-ratio: ${entry.widthRatio}; --height-ratio: ${entry.heightRatio};`, type: 'button' })
            button.addEventListener('click', entry.callback)
            navigationLayer.insertAdjacentElement('beforeend', button)
        }
    }

    getRoot(): HTMLElement {
        return this.#root
    }

}
