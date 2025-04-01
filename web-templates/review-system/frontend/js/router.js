// review-system/frontend/js/router.js

console.log('Routing to:', path, '=>', file);


const routes = {
    '/': 'js/pages/home.html',
    '/admin': 'js/pages/admin.html',
    '/submit': 'js/pages/submit.html'
  };
  
  export async function router() {
    const main = document.getElementById('template-content');
    const path = location.hash.replace('#', '') || '/';
    const file = routes[path] || routes['/'];
  
    try {
      const res = await fetch(file);
      const html = await res.text();
      main.innerHTML = html;
    } catch (error) {
      main.innerHTML = '<h2>Error loading page.</h2>';
      console.error(error);
    }
  }
  
  // Manejar navegación
  window.addEventListener('hashchange', router);
  window.addEventListener('DOMContentLoaded', router);
  