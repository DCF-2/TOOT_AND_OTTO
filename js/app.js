if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/js/sw.js')
            .then(registration => {
              console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(err => {
              console.log('Falha ao registrar o Service Worker:', err);
            });
        });
      }