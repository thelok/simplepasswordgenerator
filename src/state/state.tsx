import { atomWithStorage } from "jotai/utils";
import { PasswordGeneratorData } from "../passwordGenerator/PasswordGeneratorData";

export type ThemePreference = "system" | "light" | "dark";

export const themeAtom = atomWithStorage<ThemePreference>("theme", "system");

export const passwordGeneratorAtom = atomWithStorage<PasswordGeneratorData>('passwordGeneratorData', {
    mode: "password",
    isUseAlpha: true,
    isUseNumeric: true,
    passwordLength: 20,
    isUseSimpleSymbols: true,
    isUseComplexSymbols: false,
    isExcludeAmbiguousCharacters: true,
    wordCount: 5,
    separator: "-",
    capitalizeWords: false,
    appendNumber: false,
})