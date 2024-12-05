
export function createElement(tag: string, attributes: { [key: string]: any } = {}) {
    let elem = document.createElement(tag)
    for (let [key, value] of Object.entries(attributes))
        elem.setAttribute(key, String(value))
    return elem
}
