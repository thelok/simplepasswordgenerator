import { registerSW } from "virtual:pwa-register";

// On every page load the browser revalidates sw.js against the server.
// If a new build has shipped, the new SW installs, skipWaiting() activates it,
// and registerSW reloads the page on controllerchange — so the fresh bundle
// shows up automatically without a hard refresh.
registerSW({ immediate: true });
