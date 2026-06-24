import { Checkbox, Field, Slider } from "@fluentui/react-components";
import { useAtom } from "jotai";
import { passwordGeneratorAtom } from "../state/state";
import { PasswordStrength } from "./PasswordStrength";
import "./passwordgenerator.scss";

const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export const PasswordGeneratorForm = () => {
    const [passwordGenerator, setPasswordGenerator] = useAtom(passwordGeneratorAtom);

    return <div className="password-generator-form">
        <Field label={`Password Length: ${passwordGenerator.passwordLength}`}>
            <Slider
                min={MIN_LENGTH}
                max={MAX_LENGTH}
                value={passwordGenerator.passwordLength}
                onChange={(_, data) => setPasswordGenerator({ ...passwordGenerator, passwordLength: data.value })}
            />
        </Field>
        <Checkbox
            label={<><span>Use alpha characters?</span><span className="opaque"> (A-Z and a-z)</span></>}
            checked={passwordGenerator.isUseAlpha}
            onChange={() => setPasswordGenerator({ ...passwordGenerator, isUseAlpha: !passwordGenerator.isUseAlpha })}
        />
        <Checkbox
            label={<><span>Use numeric characters?</span><span className="opaque"> (0-9)</span></>}
            checked={passwordGenerator.isUseNumeric}
            onChange={() => setPasswordGenerator({ ...passwordGenerator, isUseNumeric: !passwordGenerator.isUseNumeric })}
        />
        <Checkbox
            label={<><span>Use simple symbols?</span><span className="opaque"> (typical characters found at top of keyboard <span className="code">!@#$%^&*()-=_+</span>)</span></>}
            checked={passwordGenerator.isUseSimpleSymbols}
            onChange={() => setPasswordGenerator({ ...passwordGenerator, isUseSimpleSymbols: !passwordGenerator.isUseSimpleSymbols })}
        />
        <Checkbox
            label={<><span>Use complex symbols?</span><span className="opaque code"> ("',./:;&lt;&gt;?[\]`&#123;|&#125;~)</span></>}
            checked={passwordGenerator.isUseComplexSymbols}
            onChange={() => setPasswordGenerator({ ...passwordGenerator, isUseComplexSymbols: !passwordGenerator.isUseComplexSymbols })}
        />
        <Checkbox
            label={<><span>Exclude ambiguous characters?</span><span className="opaque"> (Excludes: <span className="code"> iI1lOo08B)</span></span></>}
            checked={passwordGenerator.isExcludeAmbiguousCharacters}
            onChange={() => setPasswordGenerator({ ...passwordGenerator, isExcludeAmbiguousCharacters: !passwordGenerator.isExcludeAmbiguousCharacters })}
        />
        <PasswordStrength />
    </div>
}
