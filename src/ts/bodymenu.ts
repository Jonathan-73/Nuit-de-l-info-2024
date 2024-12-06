import { createElement } from "./elementFactory"

export interface CoordRatio {
    widthRatio: number
    heightRatio: number
}

export interface BodyEntry {
    coordRatio: CoordRatio
    callback: () => void
    accessFromCoordRatio?: CoordRatio
}
// let bodyEntry: BodyEntry = {coordHeight: 1, coordWidth: 2, callBack: (a) => a}

class BodyBoat {
    #root: HTMLElement
    #target?: BodyEntry
    #wayPoints: CoordRatio[]
    static #moveAnimDurationSecond: number = .7
    #timeoutId?: ReturnType<typeof setTimeout>

    constructor() {
        this.#root = createElement('div', { id: 'animatedBoat', style: `--width-ratio: .5; --height-ratio: .5; --move-anim-duration: ${BodyBoat.#moveAnimDurationSecond}` })
        this.#target = undefined
        this.#wayPoints = []
        this.#timeoutId = undefined
    }

    goToEntry(entry: BodyEntry) {
        if (entry == this.#target) return;
        this.#wayPoints = []
        if (this.#target !== undefined && this.#target.accessFromCoordRatio !== undefined)
            this.#wayPoints.push(this.#target.accessFromCoordRatio)
        if (entry.accessFromCoordRatio !== undefined)
            this.#wayPoints.push(entry.accessFromCoordRatio)
        this.#wayPoints.push(entry.coordRatio)
        this.#target = entry
        if (this.#timeoutId !== undefined) {
            clearTimeout(this.#timeoutId)
            this.#timeoutId = undefined
        }
        this.#moveToNextWayPoint()
    }

    #moveToNextWayPoint() {
        if (this.#wayPoints.length === 0) {
            this.#timeoutId = undefined
            return;
        }
        const nextWayPoint: CoordRatio = structuredClone(this.#wayPoints.shift())!
        const deltaHeight: number = nextWayPoint.heightRatio - parseFloat(this.#root.style.getPropertyValue('--height-ratio'))
        const deltaWidth: number = nextWayPoint.widthRatio - parseFloat(this.#root.style.getPropertyValue('--width-ratio'))
        const angleRad = Math.atan2(-deltaHeight, deltaWidth)
        if (this.#wayPoints.length === 0)
        {
            const abs = Math.sqrt(Math.pow(deltaHeight, 2) + Math.pow(deltaWidth, 2))
            nextWayPoint.heightRatio -= deltaHeight/abs * .04
            nextWayPoint.widthRatio -= deltaWidth/abs * .04
        }
        this.#root.style.setProperty('--rotate-url', this.#imageUrlFromAngle(angleRad))
        this.#root.style.setProperty('--height-ratio', nextWayPoint.heightRatio.toString())
        this.#root.style.setProperty('--width-ratio', nextWayPoint.widthRatio.toString())
        this.#timeoutId = setTimeout(() => { this.#moveToNextWayPoint() }, BodyBoat.#moveAnimDurationSecond * 1000 * .93)
    }
    #imageUrlFromAngle(angleRad: number) {
        angleRad += Math.PI*2/8/2
        angleRad = (angleRad % (Math.PI*2) + (Math.PI*2)) % (Math.PI*2)
        return `url("/src/assets/boats/boat_000${Math.floor(angleRad / (Math.PI*2/8) + 1)}.png")`
    }

    getRoot(): HTMLElement { return this.#root }
}

export class BodyMenu {
    #root: HTMLElement
    #entries: BodyEntry[]

    constructor(entries: BodyEntry[]) {
        this.#root = createElement('div', { id: "bodyMenu" })
        this.#entries = entries

        // Background
        this.#root.insertAdjacentElement("afterbegin", createElement('div', { id: "BodyMenuBackground", style: 'width: 800px; height: 800px;' }))

        // Navigation
        let navigationLayer = createElement('div', { id: 'navigationLayer' })
        this.#root.insertAdjacentElement("beforeend", navigationLayer)

        const boat = new BodyBoat()
        navigationLayer.insertAdjacentElement("beforeend", boat.getRoot())

        for (const entry of this.#entries) {
            let button = createElement('button', { class: 'MenuEntryRoot', style: `--width-ratio: ${entry.coordRatio.widthRatio}; --height-ratio: ${entry.coordRatio.heightRatio};`, type: 'button' })
            button.addEventListener('click', entry.callback)
            button.addEventListener('mouseover', () => { button.focus() })
            button.addEventListener('mouseover', () => { boat.goToEntry(entry) })
            button.addEventListener('focusin', () => { boat.goToEntry(entry) })
            navigationLayer.insertAdjacentElement('beforeend', button)
        }
    }

    getRoot(): HTMLElement { return this.#root }

}
