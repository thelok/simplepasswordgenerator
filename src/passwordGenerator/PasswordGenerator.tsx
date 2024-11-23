import { Button } from "@fluentui/react-components";
import { useAtom } from "jotai";
import { useState } from "react";
import { passwordGeneratorAtom } from "../state/state";
import { Password } from "./Password";

const alphaCharacterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numericCharacterSet = "0123456789";
const simpleSymbols = "!@#$%^&*()-=_+";
const complexSymbols = "\"',./:;<>?[\\]`{|}~";
const ambiguousCharacters = "iI1lOo08B"

const NUM_PASSWORDS_GENERATE = 10;

/**
 * PasswordGenerator component generates a list of random passwords based on user-selected criteria.
 * 
 * The component uses the following character sets:
 * - `alphaCharacterSet`: Alphabetic characters (both uppercase and lowercase).
 * - `numericCharacterSet`: Numeric characters (0-9).
 * - `simpleSymbols`: Simple symbol characters.
 * - `complexSymbols`: Complex symbol characters.
 * - `ambiguousCharacters`: Characters that are often confused with each other.
 * 
 * The number of passwords generated is determined by the constant `NUM_PASSWORDS_GENERATE`.
 * 
 * The component uses the `passwordGeneratorAtom` state to get the user-selected criteria for password generation.
 * 
 * Functions:
 * - `getCharacterSet`: Constructs the character set based on user-selected criteria.
 * - `generatePassword`: Generates a single password using the constructed character set.
 * - `onGeneratePassword`: Generates multiple passwords and updates the component state.
 * 
 * The component renders a button to trigger password generation and a list of generated passwords.
 * 
 * @returns {JSX.Element} The PasswordGenerator component.
 */
export const PasswordGenerator = () => {
    const [passwordGeneratorForm] = useAtom(passwordGeneratorAtom);
    const [passwords, setPasswords] = useState<string[]>([]);

    const getCharacterSet = () => {
        let characterSet = "";

        if (passwordGeneratorForm.isUseAlpha) {
            characterSet += alphaCharacterSet;
        }

        if (passwordGeneratorForm.isUseNumeric) {
            characterSet += numericCharacterSet;
        }

        if (passwordGeneratorForm.isUseSimpleSymbols) {
            characterSet += simpleSymbols;
        }

        if (passwordGeneratorForm.isUseComplexSymbols) {
            characterSet += complexSymbols;
        }

        if (passwordGeneratorForm.isExcludeAmbiguousCharacters) {
            for (let i = 0; i < ambiguousCharacters.length; i++) {
                characterSet = characterSet.replaceAll(ambiguousCharacters[i], "");
            }
        }

        return characterSet;
    }

    const generatePassword = () => {
        const charset = getCharacterSet();
        let result = "";

        const myArray = new Uint32Array(passwordGeneratorForm.passwordLength);
        crypto.getRandomValues(myArray);

        for (let i = 0, n = charset.length; i < passwordGeneratorForm.passwordLength; ++i) {
            result += charset.charAt(Math.floor(myArray[i] % n));
        }

        return result;
    }

    const onGeneratePassword = () => {
        const newPasswords: string[] = [];

        for (let i = 0; i < NUM_PASSWORDS_GENERATE; i++) {
            newPasswords.push(generatePassword());
        }

        setPasswords(newPasswords);
    }

    return <div className="generate-section">
        <Button
            disabled={!getCharacterSet()}
            appearance='primary'
            onClick={onGeneratePassword}
            size="large"
        >
            Generate
        </Button>
        {/* {password && <div className="code">{password}</div>} */}
        <div className="password-list">
            {passwords.map((password, index) => {
                return <Password key={index} password={password} />
            })}
        </div>
    </div>
}