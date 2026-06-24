import { PasswordGeneratorData } from "./PasswordGeneratorData";
import { WORDLIST } from "./wordlist";

export const ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const NUMERIC = "0123456789";
export const SIMPLE_SYMBOLS = "!@#$%^&*()-=_+";
export const COMPLEX_SYMBOLS = "\"',./:;<>?[\\]`{|}~";
export const AMBIGUOUS = "iI1lOo08B";

function stripChars(s: string, remove: string): string {
    let out = s;
    for (const c of remove) out = out.replaceAll(c, "");
    return out;
}

/** Returns the active character classes for the given options, after exclusion filtering. */
export function getCharacterClasses(opts: PasswordGeneratorData): string[] {
    const classes: string[] = [];
    if (opts.isUseAlpha) classes.push(ALPHA);
    if (opts.isUseNumeric) classes.push(NUMERIC);
    if (opts.isUseSimpleSymbols) classes.push(SIMPLE_SYMBOLS);
    if (opts.isUseComplexSymbols) classes.push(COMPLEX_SYMBOLS);

    let exclude = opts.customExclude ?? "";
    if (opts.isExcludeAmbiguousCharacters) exclude += AMBIGUOUS;
    if (exclude) {
        return classes.map((c) => stripChars(c, exclude)).filter((c) => c.length > 0);
    }
    return classes;
}

export function getCharacterSet(opts: PasswordGeneratorData): string {
    return getCharacterClasses(opts).join("");
}

/** Uniform random integer in [0, max) using rejection sampling to avoid modulo bias. */
function randomInt(max: number): number {
    if (max <= 0) throw new Error("max must be positive");
    const limit = Math.floor(0x100000000 / max) * max;
    const buf = new Uint32Array(1);
    let r: number;
    do {
        crypto.getRandomValues(buf);
        r = buf[0];
    } while (r >= limit);
    return r % max;
}

/** Fisher–Yates shuffle using the same unbiased CSPRNG. */
function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = randomInt(i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Generate a password of the configured length.
 * Guarantees at least one character from every enabled class (when length permits),
 * fills the remainder uniformly from the combined set, then shuffles.
 */
export function generatePassword(opts: PasswordGeneratorData): string {
    const classes = getCharacterClasses(opts);
    const charset = classes.join("");
    if (charset.length === 0 || opts.passwordLength <= 0) return "";

    const chars: string[] = [];
    for (const cls of classes) {
        if (chars.length >= opts.passwordLength) break;
        chars.push(cls[randomInt(cls.length)]);
    }
    while (chars.length < opts.passwordLength) {
        chars.push(charset[randomInt(charset.length)]);
    }
    return shuffle(chars).join("");
}

function capitalize(w: string): string {
    return w.charAt(0).toUpperCase() + w.slice(1);
}

export function generatePassphrase(opts: PasswordGeneratorData): string {
    const count = Math.max(1, opts.wordCount ?? 5);
    const sep = opts.separator ?? "-";
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
        const w = WORDLIST[randomInt(WORDLIST.length)];
        words.push(opts.capitalizeWords ? capitalize(w) : w);
    }
    let out = words.join(sep);
    if (opts.appendNumber) {
        out += sep + randomInt(100).toString().padStart(2, "0");
    }
    return out;
}

export function generate(opts: PasswordGeneratorData): string {
    return (opts.mode ?? "password") === "passphrase" ? generatePassphrase(opts) : generatePassword(opts);
}

/** Shannon entropy in bits for the current configuration. */
export function entropyBits(opts: PasswordGeneratorData): number {
    if ((opts.mode ?? "password") === "passphrase") {
        const count = Math.max(1, opts.wordCount ?? 5);
        let bits = count * Math.log2(WORDLIST.length);
        if (opts.appendNumber) bits += Math.log2(100);
        return bits;
    }
    const n = getCharacterSet(opts).length;
    if (n === 0) return 0;
    return opts.passwordLength * Math.log2(n);
}

const SECONDS_PER = [
    ["millennia", 31536000000],
    ["centuries", 3153600000],
    ["years", 31536000],
    ["months", 2592000],
    ["days", 86400],
    ["hours", 3600],
    ["minutes", 60],
] as const;

/** Human-readable offline crack time at 10 billion guesses/second. */
export function crackTimeDisplay(bits: number): string {
    if (bits <= 0) return "instantly";
    const guesses = Math.pow(2, bits - 1);
    const seconds = guesses / 1e10;
    if (!isFinite(seconds)) return "heat death of the universe";
    for (const [label, s] of SECONDS_PER) {
        if (seconds >= s) {
            const v = seconds / s;
            return v >= 1e6 ? `${v.toExponential(1)} ${label}` : `${Math.round(v).toLocaleString()} ${label}`;
        }
    }
    return seconds >= 1 ? `${Math.round(seconds)} seconds` : "instantly";
}
