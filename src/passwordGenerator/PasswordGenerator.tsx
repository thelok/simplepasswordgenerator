import { Button } from "@fluentui/react-components";
import { useAtom } from "jotai";
import { useState } from "react";
import { passwordGeneratorAtom } from "../state/state";
import { Password } from "./Password";
import { generatePassword, getCharacterSet } from "./generate";

const NUM_PASSWORDS_GENERATE = 10;

export const PasswordGenerator = () => {
    const [passwordGeneratorForm] = useAtom(passwordGeneratorAtom);
    const [passwords, setPasswords] = useState<string[]>([]);

    const onGeneratePassword = () => {
        const newPasswords: string[] = [];
        for (let i = 0; i < NUM_PASSWORDS_GENERATE; i++) {
            newPasswords.push(generatePassword(passwordGeneratorForm));
        }
        setPasswords(newPasswords);
    }

    return <div className="generate-section">
        <Button
            disabled={!getCharacterSet(passwordGeneratorForm)}
            appearance='primary'
            onClick={onGeneratePassword}
            size="large"
        >
            Generate
        </Button>
        <div className="password-list">
            {passwords.map((password, index) => {
                return <Password key={index} password={password} />
            })}
        </div>
    </div>
}
