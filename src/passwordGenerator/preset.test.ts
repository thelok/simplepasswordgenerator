import { describe, expect, it } from "vitest";
import { decodePreset, encodePreset } from "./preset";
import { PasswordGeneratorData } from "./PasswordGeneratorData";

const opts: PasswordGeneratorData = {
    mode: "passphrase",
    isUseAlpha: true,
    isUseNumeric: false,
    isUseSimpleSymbols: true,
    isUseComplexSymbols: false,
    isExcludeAmbiguousCharacters: true,
    customExclude: "{}|",
    passwordLength: 24,
    generateCount: 5,
    wordCount: 6,
    separator: ".",
    capitalizeWords: true,
    appendNumber: true,
};

describe("preset codec", () => {
    it("round-trips all fields", () => {
        const encoded = encodePreset(opts);
        const decoded = decodePreset(encoded);
        expect(decoded).toEqual(opts);
    });

    it("decodes partial query strings", () => {
        const decoded = decodePreset("len=32&alpha=1&sym=0");
        expect(decoded.passwordLength).toBe(32);
        expect(decoded.isUseAlpha).toBe(true);
        expect(decoded.isUseSimpleSymbols).toBe(false);
        expect(decoded.mode).toBeUndefined();
    });

    it("clamps and rejects invalid values", () => {
        const decoded = decodePreset("len=999&n=-5&mode=evil&alpha=maybe");
        expect(decoded.passwordLength).toBe(64);
        expect(decoded.generateCount).toBe(1);
        expect(decoded.mode).toBeUndefined();
        expect(decoded.isUseAlpha).toBeUndefined();
    });

    it("ignores unknown params", () => {
        const decoded = decodePreset("len=16&__proto__=x&foo=bar");
        expect(decoded).toEqual({ passwordLength: 16 });
    });
});
