# Simple Password Generator

[![Deploy](https://github.com/thelok/simplepasswordgenerator/actions/workflows/static.yml/badge.svg)](https://github.com/thelok/simplepasswordgenerator/actions/workflows/static.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A fast, open-source, **client-side** password generator. Passwords are created entirely in your browser using `crypto.getRandomValues` — nothing is sent over the network, nothing is stored.

**Try it:** [simplepasswordgenerator.net](https://simplepasswordgenerator.net) · [GitHub Pages mirror](https://thelok.github.io/simplepasswordgenerator)

## Features

- **Cryptographically secure** — uses the Web Crypto API with unbiased rejection sampling (no modulo bias)
- **Guaranteed character classes** — every password contains at least one of each enabled type (letters, numbers, symbols)
- **Live strength meter** — see entropy bits and estimated crack time as you adjust settings
- **Installable PWA** — works fully offline; add it to your home screen
- **Customizable** — length 6–64, simple/complex symbols, exclude ambiguous characters (`iI1lOo08B`)
- **Zero tracking** — no analytics, no cookies, no network calls

## Why client-side?

Since passwords are generated locally, they never travel over the network and are never visible to us. You can audit the [generator source](src/passwordGenerator/generate.ts) — it's ~100 lines.

## Tech

React · TypeScript · Fluent UI · Jotai · Vite · Vitest · vite-plugin-pwa

## Development

```sh
npm install
npm run dev      # http://localhost:5173
npm test         # run unit tests
npm run build    # production build to ./dist
```

## License

MIT
