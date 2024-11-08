export interface PasswordGeneratorData {
    isUseAlpha: boolean;
    isUseNumeric: boolean;
    isUseSimpleSymbols: boolean;
    isUseComplexSymbols: boolean;
    isExcludeAmbiguousCharacters: boolean;
    passwordLength: number;
}