import { describe, expect, it } from "vitest";
import {
    ALPHA,
    AMBIGUOUS,
    COMPLEX_SYMBOLS,
    NUMERIC,
    SIMPLE_SYMBOLS,
    crackTimeDisplay,
    entropyBits,
    generatePassphrase,
    generatePassword,
    getCharacterSet,
} from "./generate";
import { WORDLIST } from "./wordlist";
import { PasswordGeneratorData } from "./PasswordGeneratorData";

const base: PasswordGeneratorData = {
    mode: "password",
    isUseAlpha: true,
    isUseNumeric: true,
    isUseSimpleSymbols: true,
    isUseComplexSymbols: false,
    isExcludeAmbiguousCharacters: false,
    customExclude: "",
    passwordLength: 20,
    generateCount: 10,
    wordCount: 5,
    separator: "-",
    capitalizeWords: false,
    appendNumber: false,
};

describe("getCharacterSet", () => {
    it("combines selected classes", () => {
        const cs = getCharacterSet(base);
        expect(cs).toContain("a");
        expect(cs).toContain("9");
        expect(cs).toContain("!");
        expect(cs).not.toContain("?");
    });

    it("strips ambiguous characters when requested", () => {
        const cs = getCharacterSet({ ...base, isExcludeAmbiguousCharacters: true });
        for (const c of AMBIGUOUS) expect(cs).not.toContain(c);
        expect(cs).toContain("a");
    });

    it("strips custom-excluded characters", () => {
        const cs = getCharacterSet({ ...base, customExclude: "abc!9" });
        expect(cs).not.toContain("a");
        expect(cs).not.toContain("b");
        expect(cs).not.toContain("!");
        expect(cs).not.toContain("9");
        expect(cs).toContain("d");
        expect(cs).toContain("@");
    });

    it("drops a class entirely if exclusions empty it", () => {
        const cs = getCharacterSet({
            ...base,
            isUseAlpha: false,
            isUseSimpleSymbols: false,
            customExclude: "0123456789",
        });
        expect(cs).toBe("");
    });

    it("returns empty when nothing selected", () => {
        expect(getCharacterSet({
            ...base,
            isUseAlpha: false,
            isUseNumeric: false,
            isUseSimpleSymbols: false,
        })).toBe("");
    });
});

describe("generatePassword", () => {
    it("returns the requested length", () => {
        for (const len of [1, 8, 20, 64]) {
            expect(generatePassword({ ...base, passwordLength: len })).toHaveLength(len);
        }
    });

    it("only emits characters from the active set", () => {
        const opts = { ...base, isExcludeAmbiguousCharacters: true };
        const cs = new Set(getCharacterSet(opts));
        const pw = generatePassword({ ...opts, passwordLength: 200 });
        for (const c of pw) expect(cs.has(c)).toBe(true);
    });

    it("guarantees at least one of each enabled class", () => {
        const opts: PasswordGeneratorData = {
            ...base,
            isUseAlpha: true,
            isUseNumeric: true,
            isUseSimpleSymbols: true,
            isUseComplexSymbols: true,
            isExcludeAmbiguousCharacters: false,
            passwordLength: 4,
        };
        for (let i = 0; i < 200; i++) {
            const pw = generatePassword(opts);
            expect([...pw].some((c) => ALPHA.includes(c))).toBe(true);
            expect([...pw].some((c) => NUMERIC.includes(c))).toBe(true);
            expect([...pw].some((c) => SIMPLE_SYMBOLS.includes(c))).toBe(true);
            expect([...pw].some((c) => COMPLEX_SYMBOLS.includes(c))).toBe(true);
        }
    });

    it("returns empty string for empty charset", () => {
        expect(generatePassword({
            ...base,
            isUseAlpha: false,
            isUseNumeric: false,
            isUseSimpleSymbols: false,
        })).toBe("");
    });

    it("produces different outputs across calls", () => {
        const seen = new Set<string>();
        for (let i = 0; i < 50; i++) seen.add(generatePassword(base));
        expect(seen.size).toBeGreaterThan(45);
    });
});

describe("generatePassphrase", () => {
    const phraseOpts: PasswordGeneratorData = { ...base, mode: "passphrase" };

    it("wordlist contains no separator characters", () => {
        for (const w of WORDLIST) {
            expect(w).toMatch(/^[a-z]+$/);
        }
    });

    it("emits the configured number of words from the wordlist", () => {
        const dict = new Set(WORDLIST);
        for (let i = 0; i < 50; i++) {
            const parts = generatePassphrase({ ...phraseOpts, wordCount: 6 }).split("-");
            expect(parts).toHaveLength(6);
            for (const w of parts) expect(dict.has(w)).toBe(true);
        }
    });

    it("respects separator and capitalization", () => {
        const p = generatePassphrase({ ...phraseOpts, separator: ".", capitalizeWords: true, wordCount: 4 });
        const parts = p.split(".");
        expect(parts).toHaveLength(4);
        for (const w of parts) expect(w[0]).toBe(w[0].toUpperCase());
    });

    it("appends a two-digit number when requested", () => {
        const p = generatePassphrase({ ...phraseOpts, wordCount: 3, appendNumber: true });
        expect(p).toMatch(/-(\d{2})$/);
    });

    it("computes passphrase entropy from word count", () => {
        const bits = entropyBits({ ...phraseOpts, wordCount: 5 });
        expect(bits).toBeCloseTo(5 * Math.log2(1296), 3);
    });
});

describe("entropy", () => {
    it("computes bits from charset and length", () => {
        const opts = { ...base, isUseSimpleSymbols: false, isUseNumeric: false };
        expect(entropyBits({ ...opts, passwordLength: 10 })).toBeCloseTo(10 * Math.log2(52), 5);
    });

    it("formats crack time", () => {
        expect(crackTimeDisplay(0)).toBe("instantly");
        expect(crackTimeDisplay(128)).toMatch(/millennia|universe/);
    });
});
