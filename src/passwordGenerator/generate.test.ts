import { describe, expect, it } from "vitest";
import {
    ALPHA,
    AMBIGUOUS,
    COMPLEX_SYMBOLS,
    NUMERIC,
    SIMPLE_SYMBOLS,
    crackTimeDisplay,
    entropyBits,
    generatePassword,
    getCharacterSet,
} from "./generate";
import { PasswordGeneratorData } from "./PasswordGeneratorData";

const base: PasswordGeneratorData = {
    isUseAlpha: true,
    isUseNumeric: true,
    isUseSimpleSymbols: true,
    isUseComplexSymbols: false,
    isExcludeAmbiguousCharacters: false,
    passwordLength: 20,
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
