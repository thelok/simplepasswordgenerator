
/**
 * Interface representing the configuration options for generating a password.
 */
export interface PasswordGeneratorData {
    isUseAlpha: boolean;
    isUseNumeric: boolean;
    isUseSimpleSymbols: boolean;
    isUseComplexSymbols: boolean;
    isExcludeAmbiguousCharacters: boolean;
    passwordLength: number;
}