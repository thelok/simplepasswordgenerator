import { Button } from "@fluentui/react-components";
import { CopyRegular } from "@fluentui/react-icons";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { passwordGeneratorAtom } from "../state/state";
import { Password } from "./Password";
import { generate, getCharacterSet } from "./generate";

export const PasswordGenerator = () => {
    const [passwordGeneratorForm] = useAtom(passwordGeneratorAtom);
    const [passwords, setPasswords] = useState<string[]>([]);
    const [copyAllLabel, setCopyAllLabel] = useState("Copy all");

    const onGeneratePassword = useCallback(() => {
        const count = passwordGeneratorForm.generateCount ?? 10;
        const newPasswords: string[] = [];
        for (let i = 0; i < count; i++) {
            newPasswords.push(generate(passwordGeneratorForm));
        }
        setPasswords(newPasswords);
    }, [passwordGeneratorForm]);

    const canGenerate = (passwordGeneratorForm.mode ?? "password") === "passphrase" || !!getCharacterSet(passwordGeneratorForm);

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

    const onCopyAll = () => {
        navigator.clipboard.writeText(passwords.join("\n"));
        setCopyAllLabel("Copied!");
        setTimeout(() => setCopyAllLabel("Copy all"), 2000);
    };

    return <div className="generate-section">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Button
                disabled={!canGenerate}
                appearance='primary'
                onClick={onGeneratePassword}
                size="large"
            >
                Generate <span className="opaque" style={{ marginLeft: 8 }}>(R)</span>
            </Button>
            {passwords.length > 1 && (
                <Button appearance="secondary" size="large" icon={<CopyRegular />} onClick={onCopyAll}>
                    {copyAllLabel}
                </Button>
            )}
        </div>
        <div className="password-list">
            {passwords.map((password, index) => {
                return <Password key={index} password={password} />
            })}
        </div>
    </div>
}
