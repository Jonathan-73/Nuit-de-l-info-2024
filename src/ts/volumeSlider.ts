import "../css/volumeSlider.css"

export function createDivVolumeSlider() {

    const newDiv = document.createElement("div");

    const viewBoxWidth = 400, viewBoxHeigth = 200;

    const description = `
    <div class="slider-container">
        <svg class="volume-slider-svg-class" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeigth}" preserveAspectRatio="xMidYMid meet">
            <path class="slider-path-class" d="M10 100 Q 100 50, 200 100 T 390 100" fill="none" stroke="#00796b" stroke-width="2" /> 
            <circle class="slider-thumb-class" cx="0" cy="0" r="8" fill="#00796b" />
        </svg>
        <input type="range" class="volume-slider-class" min="0" max="1" value="0" step="0.001">
    </div>
    `

    newDiv.innerHTML = (description);

    const sliderContainer = <SVGElement> newDiv.querySelector(`.volume-slider-svg-class`);
    const sliderPath = <SVGPathElement> newDiv.querySelector(`.slider-path-class`);
    const sliderThumb = <SVGElement> newDiv.querySelector(`.slider-thumb-class`);
    const slider = <HTMLInputElement> newDiv.querySelector(`.volume-slider-class`);

    let event = <CustomEvent> new Event("change");
    const inputRange = <HTMLInputElement> newDiv.querySelector(`input[type="range"]`);
    const pathLength = sliderPath.getTotalLength();

    let isDragging = false;

    // Update the slider thumb and label based on the slider value
    function updateSlider(value: number) {
        const pointAt = (value) * pathLength;
        const point = sliderPath.getPointAtLength(pointAt);

        // Move the thumb
        sliderThumb.setAttribute('cx', point.x.toString());
        sliderThumb.setAttribute('cy', point.y.toString());
    }

    // Initialize the slider thumb position
    updateSlider(parseFloat(slider.value));

    // Sync slider input with thumb movement
    slider.addEventListener('input', () => updateSlider(parseFloat(slider.value)) ) ; 


    // Handle mouse interaction - Get nearest slider value based only on the X-coordinate
    function getNearestSliderValue(mouseX : number) {
        const svgRect = sliderPath.getBoundingClientRect();

        // Transform mouse X coordinate to SVG coordinates
        const svgX = viewBoxWidth * (mouseX - svgRect.left) / (svgRect.width);

        // Find the nearest point on the path based on X only
        let closestDistance = Infinity;
        let closestValue = 0;

        for (let i = 0; i <= 100; i++) {
            const pointAt = (i / 100) * pathLength;
            const point = sliderPath.getPointAtLength(pointAt);
            const distance = Math.abs(svgX - point.x);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestValue = i;
            }
        }

        return closestValue / 100;
    }

    function set_event_value(){
        event = new CustomEvent("change", {detail : ((Math.sin(parseFloat(inputRange.value) * 2 * Math.PI ) + 1 ) / 2) });
        newDiv.dispatchEvent(event);
    };

    // Mouse down: Start dragging
    sliderThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        const newValue = getNearestSliderValue(e.clientX);
        slider.value = newValue.toFixed(2);
        updateSlider(newValue);
    });

    // Mouse move: Update slider while dragging
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newValue = getNearestSliderValue(e.clientX);
            slider.value = newValue.toFixed(2);
            updateSlider(newValue);
            set_event_value()
        }
    });

    // Mouse up: Stop dragging
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    sliderContainer.addEventListener('click', (e) => {
        const newValue = getNearestSliderValue(e.clientX);
        slider.value = newValue.toFixed(2);
        updateSlider(newValue);
        set_event_value()
    });

    // Touch support
    sliderThumb.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        const newValue = getNearestSliderValue(touch.clientX);
        slider.value = newValue.toFixed(2);
        updateSlider(newValue);
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            const newValue = getNearestSliderValue(touch.clientX);
            slider.value = newValue.toFixed(2);
            updateSlider(newValue);
            set_event_value()
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
        set_event_value()
    });

    return newDiv
}


/* Usage prototype : */
/*
const divToBePlaced = createDivVolumeSlider();

const body = document.querySelector(".ici");
body.append(divToBePlaced);

divToBePlaced.addEventListener('change', (event)=>{console.log(event.value)})
*/
