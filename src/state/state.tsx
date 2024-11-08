import { atomWithStorage } from "jotai/utils";
import { PasswordGeneratorData } from "../passwordGenerator/PasswordGeneratorData";

export const passwordGeneratorAtom = atomWithStorage<PasswordGeneratorData>('passwordGeneratorData', {
    isUseAlpha: true,
    isUseNumeric: true,
    passwordLength: 20,
    isUseSimpleSymbols: true,
    isUseComplexSymbols: false,
    isExcludeAmbiguousCharacters: true,
})