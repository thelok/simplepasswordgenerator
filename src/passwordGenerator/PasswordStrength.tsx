import { ProgressBar, tokens } from "@fluentui/react-components";
import { useAtomValue } from "jotai";
import { passwordGeneratorAtom } from "../state/state";
import { crackTimeDisplay, entropyBits, getCharacterSet } from "./generate";

const TIERS = [
    { min: 0, label: "Very weak", color: tokens.colorStatusDangerForeground1 },
    { min: 36, label: "Weak", color: tokens.colorStatusDangerForeground1 },
    { min: 60, label: "Fair", color: tokens.colorStatusWarningForeground1 },
    { min: 80, label: "Strong", color: tokens.colorStatusSuccessForeground1 },
    { min: 120, label: "Very strong", color: tokens.colorStatusSuccessForeground1 },
];

export const PasswordStrength = () => {
    const opts = useAtomValue(passwordGeneratorAtom);
    const charset = getCharacterSet(opts);
    const bits = entropyBits(opts);
    const tier = [...TIERS].reverse().find((t) => bits >= t.min) ?? TIERS[0];
    const pct = Math.min(bits / 128, 1);

    return (
        <div className="password-strength">
            <div className="strength-header">
                <span style={{ color: tier.color, fontWeight: 600 }}>{tier.label}</span>
                <span className="opaque">
                    {Math.round(bits)} bits · {charset.length} chars · cracked in ~{crackTimeDisplay(bits)}
                </span>
            </div>
            <ProgressBar value={pct} thickness="large" color={bits >= 80 ? "success" : bits >= 60 ? "warning" : "error"} />
        </div>
    );
};
