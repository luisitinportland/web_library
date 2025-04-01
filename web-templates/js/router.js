const mainContent = document.getElementById('main-content');

document.addEventListener('DOMContentLoaded', () => {
  // Escucha clics en las cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const templateName = card.dataset.template;
      // Cambia el hash manualmente para que popstate lo maneje
      location.hash = `#template/${templateName}`;
    });
  });

  // Al cargar la página con hash
  handleRouting();
});

// Cuando se cambia el hash manualmente o por navegador
window.addEventListener('popstate', handleRouting);
window.addEventListener('hashchange', handleRouting);

function handleRouting() {
  const hash = location.hash;

  if (hash.startsWith('#template/')) {
    const templateName = hash.split('/')[1];
    loadTemplate(templateName);
  } 
}

async function loadTemplate(templateName) {
  const path = `/web-templates/${templateName}/frontend/index.html`;

  try {
    // 1. Cargar el index.html del template seleccionado
    const res = await fetch(path);
    const html = await res.text();
    mainContent.innerHTML = html;
    console.log(`${templateName}`);
    // 2. Crear manualmente una etiqueta <script type="module"> para ejecutar main.js
    const scriptPath = `/web-templates/${templateName}/frontend/js/main.js`;

    const script = document.createElement('script');
    script.type = 'module';
    script.src = scriptPath;

    script.onerror = () => {
      console.error(`Error loading ${scriptPath}`);
    };

    // 3. Agregar el script al <body> para que se ejecute
    document.body.appendChild(script);

  } catch (err) {
    // 4. Manejo de errores si no se pudo cargar el template
    mainContent.innerHTML = `<h2>Error loading template: ${templateName}</h2>`;
    console.error(err);
  }
}



