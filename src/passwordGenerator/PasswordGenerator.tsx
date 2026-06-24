import { Button } from "@fluentui/react-components";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { passwordGeneratorAtom } from "../state/state";
import { Password } from "./Password";
import { generatePassword, getCharacterSet } from "./generate";

const NUM_PASSWORDS_GENERATE = 10;

export const PasswordGenerator = () => {
    const [passwordGeneratorForm] = useAtom(passwordGeneratorAtom);
    const [passwords, setPasswords] = useState<string[]>([]);

    const onGeneratePassword = useCallback(() => {
        const newPasswords: string[] = [];
        for (let i = 0; i < NUM_PASSWORDS_GENERATE; i++) {
            newPasswords.push(generatePassword(passwordGeneratorForm));
        }
        setPasswords(newPasswords);
    }, [passwordGeneratorForm]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
                return;
            }
            if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key === "r" || e.key === "R")) {
                e.preventDefault();
                onGeneratePassword();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onGeneratePassword]);

    return <div className="generate-section">
        <Button
            disabled={!getCharacterSet(passwordGeneratorForm)}
            appearance='primary'
            onClick={onGeneratePassword}
            size="large"
        >
            Generate <span className="opaque" style={{ marginLeft: 8 }}>(R)</span>
        </Button>
        <div className="password-list">
            {passwords.map((password, index) => {
                return <Password key={index} password={password} />
            })}
        </div>
    </div>
}
