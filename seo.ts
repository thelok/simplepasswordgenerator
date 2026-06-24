import type { Plugin } from "vite";
import { FAQ } from "./src/content/faq";
import { REASONS } from "./src/content/reasons";
import { SITE_DESCRIPTION, SITE_INTRO, SITE_NAME, SITE_TAGLINE, SITE_URL } from "./src/content/site";

const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function prerenderedBody(): string {
    const reasons = REASONS.map((r) => `<li><b>${esc(r.title)}:</b> ${esc(r.reason)}</li>`).join("");
    const faq = FAQ.map((f) => `<details><summary><h3>${esc(f.q)}</h3></summary><p>${esc(f.a)}</p></details>`).join("");
    return (
        `<div id="prerendered">` +
        `<h1>${esc(SITE_NAME)}</h1>` +
        `<p>${esc(SITE_INTRO)}</p>` +
        `<noscript><p><strong>This tool requires JavaScript</strong> to generate passwords.</p></noscript>` +
        `<h2>Why use ${esc(SITE_NAME)}?</h2><ul>${reasons}</ul>` +
        `<h2>Frequently asked questions</h2>${faq}` +
        `</div>`
    );
}

function jsonLd(): string {
    const app = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        applicationCategory: "SecurityApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
            "Cryptographically secure random password generator",
            "Diceware passphrase generator (EFF wordlist)",
            "Password strength meter with entropy and crack-time estimate",
            "Exclude ambiguous or custom characters",
            "Shareable preset URLs",
        ],
    };
    const faqPage = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };
    return (
        `<script type="application/ld+json">${JSON.stringify(app)}</script>` +
        `<script type="application/ld+json">${JSON.stringify(faqPage)}</script>`
    );
}

function metaTags(): string {
    const title = `${SITE_NAME} - ${SITE_TAGLINE}`;
    const img = `${SITE_URL}icon.svg`;
    return [
        `<title>${esc(title)}</title>`,
        `<link rel="canonical" href="${SITE_URL}">`,
        `<meta name="description" content="${esc(SITE_DESCRIPTION)}">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:url" content="${SITE_URL}">`,
        `<meta property="og:title" content="${esc(title)}">`,
        `<meta property="og:description" content="${esc(SITE_DESCRIPTION)}">`,
        `<meta property="og:image" content="${img}">`,
        `<meta name="twitter:card" content="summary">`,
        `<meta name="twitter:title" content="${esc(SITE_NAME)}">`,
        `<meta name="twitter:description" content="${esc(SITE_DESCRIPTION)}">`,
        `<meta name="twitter:image" content="${img}">`,
    ].join("\n    ");
}

const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`;

const sitemapXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url><loc>${SITE_URL}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n` +
    `</urlset>\n`;

export function seoPlugin(): Plugin {
    return {
        name: "seo-prerender",
        transformIndexHtml(html) {
            return html
                .replace("<!--seo:meta-->", metaTags() + "\n    " + jsonLd())
                .replace('<div id="root"></div>', `<div id="root">${prerenderedBody()}</div>`);
        },
        generateBundle() {
            this.emitFile({ type: "asset", fileName: "robots.txt", source: robotsTxt });
            this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml });
        },
    };
}
