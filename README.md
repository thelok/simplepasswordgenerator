# Simple Password Generator

[![Deploy](https://github.com/thelok/simplepasswordgenerator/actions/workflows/static.yml/badge.svg)](https://github.com/thelok/simplepasswordgenerator/actions/workflows/static.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A fast, open-source, **100% client-side** password and passphrase generator. Everything runs in your browser using `crypto.getRandomValues` — no network calls after the page loads, nothing sent anywhere, nothing stored.

**Try it:** https://thelok.github.io/simplepasswordgenerator/

## Features

- **Cryptographically secure** — Web Crypto API with unbiased rejection sampling (no modulo bias)
- **Guaranteed character classes** — every password contains at least one of each enabled type
- **Passphrase mode** — memorable Diceware-style phrases from the EFF wordlist (`acorn-cheek-frog-tulip`)
- **Live strength meter** — entropy bits and estimated crack time as you adjust settings
- **Shareable presets** — copy a URL that encodes your settings (`?len=24&sym=1&n=5`) for team policies
- **Customizable** — length 6–64, simple/complex symbols, exclude ambiguous characters, custom excludes, generate 1–50 at once, copy-all
- **Dark mode** — follows your OS or toggle manually
- **Zero tracking** — no analytics, no cookies, no network calls

## Why client-side?

Generating in the browser means passwords never leave your machine — there is nothing for us (or anyone in between) to see. You can audit the [generator source](src/passwordGenerator/generate.ts); it's ~130 lines.

## Tech

React · TypeScript · Fluent UI · Jotai · Vite · Vitest

## Development

```sh
npm install
npm run dev      # http://localhost:5173
npm test         # run unit tests
npm run build    # production build to ./dist
```

## License

MIT
