// Unregister all service workers to prevent conflicts
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.unregister().then(function (success) {
                if (success) {
                    console.log('Service Worker désinscrit avec succès');
                }
            });
        }
    });
}
