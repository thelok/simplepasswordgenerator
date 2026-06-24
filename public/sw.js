// Self-destroying service worker.
// A previous version of this site registered a Workbox SW that cached the
// app shell. This replacement unregisters itself, clears those caches, and
// reloads any open tabs so visitors stop being served stale builds.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", async () => {
  for (const key of await caches.keys()) await caches.delete(key);
  await self.registration.unregister();
  for (const client of await self.clients.matchAll({ type: "window" })) {
    client.navigate(client.url);
  }
});
