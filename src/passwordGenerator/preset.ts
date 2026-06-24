import { GeneratorMode, PasswordGeneratorData } from "./PasswordGeneratorData";

type Codec<T> = { encode: (v: T) => string; decode: (s: string) => T | undefined };

const bool: Codec<boolean> = {
    encode: (v) => (v ? "1" : "0"),
    decode: (s) => (s === "1" ? true : s === "0" ? false : undefined),
};
const int = (min: number, max: number): Codec<number> => ({
    encode: (v) => String(v),
    decode: (s) => {
        const n = parseInt(s, 10);
        return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : undefined;
    },
});
const str = (maxLen: number): Codec<string> => ({
    encode: (v) => v,
    decode: (s) => s.slice(0, maxLen),
});
const mode: Codec<GeneratorMode> = {
    encode: (v) => v,
    decode: (s) => (s === "password" || s === "passphrase" ? s : undefined),
};

type Schema = { [K in keyof PasswordGeneratorData]: { key: string; codec: Codec<PasswordGeneratorData[K]> } };

const SCHEMA: Schema = {
    mode: { key: "mode", codec: mode },
    isUseAlpha: { key: "alpha", codec: bool },
    isUseNumeric: { key: "num", codec: bool },
    isUseSimpleSymbols: { key: "sym", codec: bool },
    isUseComplexSymbols: { key: "xsym", codec: bool },
    isExcludeAmbiguousCharacters: { key: "noamb", codec: bool },
    customExclude: { key: "excl", codec: str(32) },
    passwordLength: { key: "len", codec: int(6, 64) },
    generateCount: { key: "n", codec: int(1, 50) },
    wordCount: { key: "words", codec: int(3, 10) },
    separator: { key: "sep", codec: str(3) },
    capitalizeWords: { key: "cap", codec: bool },
    appendNumber: { key: "appnum", codec: bool },
};

export function encodePreset(opts: PasswordGeneratorData): string {
    const params = new URLSearchParams();
    for (const field of Object.keys(SCHEMA) as (keyof PasswordGeneratorData)[]) {
        const { key, codec } = SCHEMA[field];
        const v = opts[field];
        if (v !== undefined && v !== "") {
            params.set(key, (codec as Codec<unknown>).encode(v));
        }
    }
    return params.toString();
}

export function decodePreset(query: string): Partial<PasswordGeneratorData> {
    const params = new URLSearchParams(query);
    const out: Partial<PasswordGeneratorData> = {};
    for (const field of Object.keys(SCHEMA) as (keyof PasswordGeneratorData)[]) {
        const { key, codec } = SCHEMA[field];
        const raw = params.get(key);
        if (raw === null) continue;
        const decoded = codec.decode(raw);
        if (decoded !== undefined) {
            (out as Record<string, unknown>)[field] = decoded;
        }
    }
    return out;
}

export function buildPresetUrl(opts: PasswordGeneratorData): string {
    const url = new URL(window.location.href);
    url.search = encodePreset(opts);
    return url.toString();
}
