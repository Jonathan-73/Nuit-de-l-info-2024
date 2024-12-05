type Attributes = { [key: string]: string };

export function createElement(tag: string, attributes: Attributes): HTMLElement {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    return element;
}