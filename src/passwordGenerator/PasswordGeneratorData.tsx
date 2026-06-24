
export type GeneratorMode = "password" | "passphrase";

/**
 * Interface representing the configuration options for generating a password.
 */
export interface PasswordGeneratorData {
    mode: GeneratorMode;

    isUseAlpha: boolean;
    isUseNumeric: boolean;
    isUseSimpleSymbols: boolean;
    isUseComplexSymbols: boolean;
    isExcludeAmbiguousCharacters: boolean;
    customExclude: string;
    passwordLength: number;

    generateCount: number;

    wordCount: number;
    separator: string;
    capitalizeWords: boolean;
    appendNumber: boolean;
}
