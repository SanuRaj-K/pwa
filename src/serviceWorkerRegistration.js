function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content is available; reload the page immediately.
              console.log('New content is available; reloading the page.');
              
              // Force the service worker to take control of the page
              window.location.reload(true);  // Hard refresh
              
              // Execute callback, if provided
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Everything is precached for offline use
              console.log('Content is cached for offline use.');
              
              // Execute callback, if provided
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}
