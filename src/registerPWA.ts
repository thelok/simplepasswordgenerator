import { registerSW } from "virtual:pwa-register";

const CHECK_INTERVAL_MS = 60 * 60 * 1000;

// With registerType: 'autoUpdate', the generated SW calls skipWaiting() + clientsClaim().
// registerSW() listens for controllerchange and reloads the page, so users get new
// deploys without a manual hard-refresh.
registerSW({
    immediate: true,
    onRegisteredSW(swUrl, registration) {
        if (!registration) return;
        setInterval(async () => {
            if (registration.installing || !navigator.onLine) return;
            try {
                const resp = await fetch(swUrl, { cache: "no-store", headers: { cache: "no-store" } });
                if (resp.status === 200) await registration.update();
            } catch {
                /* offline or transient network error */
            }
        }, CHECK_INTERVAL_MS);
    },
});
