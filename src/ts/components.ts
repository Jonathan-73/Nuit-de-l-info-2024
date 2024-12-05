// Define components with unique backgrounds and content
const components = [
    { color: 'bg-red-500', text: 'Component 1: Red' },
    { color: 'bg-blue-500', text: 'Component 2: Blue' },
    { color: 'bg-green-500', text: 'Component 3: Green' },
    { color: 'bg-yellow-500', text: 'Component 4: Yellow' },
  ];
  
  // Generate buttons dynamically
  const buttonsContainer = document.getElementById('buttons-container');
  components.forEach((component, index) => {
    const button = document.createElement('button');
    button.className = `btn ${component.color} text-white px-4 py-2 rounded hover:opacity-75`;
    button.textContent = `Component ${index + 1}`;
    button.onclick = () => loadComponent(index);
    buttonsContainer.appendChild(button);
  });
  
  // Function to load the selected component
  function loadComponent(index) {
    const component = components[index];
    const dynamicComponent = document.getElementById('dynamic-component');
    dynamicComponent.innerHTML = `<div class="${component.color} p-4 text-white rounded">${component.text}</div>`;
  }
  