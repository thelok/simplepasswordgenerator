import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PasswordGeneratorData } from "../passwordGenerator/PasswordGeneratorData";
import { decodePreset } from "../passwordGenerator/preset";

export type ThemePreference = "system" | "light" | "dark";

export const themeAtom = atomWithStorage<ThemePreference>("theme", "system");

export const DEFAULT_GENERATOR_DATA: PasswordGeneratorData = {
    mode: "password",
    isUseAlpha: true,
    isUseNumeric: true,
    passwordLength: 20,
    isUseSimpleSymbols: true,
    isUseComplexSymbols: false,
    isExcludeAmbiguousCharacters: true,
    customExclude: "",
    generateCount: 10,
    wordCount: 5,
    separator: "-",
    capitalizeWords: false,
    appendNumber: false,
};

const storedAtom = atomWithStorage<PasswordGeneratorData>("passwordGeneratorData", DEFAULT_GENERATOR_DATA);

let urlPreset: Partial<PasswordGeneratorData> =
    typeof window !== "undefined" && window.location.search
        ? decodePreset(window.location.search)
        : {};

export const passwordGeneratorAtom = atom(
    (get) => ({ ...DEFAULT_GENERATOR_DATA, ...get(storedAtom), ...urlPreset }),
    (_get, set, next: PasswordGeneratorData) => {
        urlPreset = {};
        set(storedAtom, next);
    },
);
