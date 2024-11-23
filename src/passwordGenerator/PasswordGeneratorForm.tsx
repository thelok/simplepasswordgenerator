import { Checkbox, Dropdown, Field, Option, OptionGroup } from "@fluentui/react-components";
import { useAtom } from "jotai";
import { passwordGeneratorAtom } from "../state/state";
import "./passwordgenerator.scss";

const WEAK_LOW_COUNT = 5;
const WEAK_HIGH_COUNT = 15;
const STRONG_HIGH_COUNT = 64;

/**
 * PasswordGeneratorForm component renders a form for configuring password generation options.
 * 
 * @returns {JSX.Element} The rendered password generator form.
 * 
 * The form includes the following fields:
 * - Password Length: A dropdown to select the length of the password. The options are divided into "Weak" and "Strong" categories.
 * - Use alpha characters: A checkbox to include alphabetic characters (A-Z and a-z) in the password.
 * - Use numeric characters: A checkbox to include numeric characters (0-9) in the password.
 * - Use simple symbols: A checkbox to include simple symbols (e.g., !@#$%^&*()-=_+) in the password.
 * - Use complex symbols: A checkbox to include complex symbols (e.g., "',./:;<>&lt;&gt;?[\]`&#123;|&#125;~) in the password.
 * - Exclude ambiguous characters: A checkbox to exclude ambiguous characters (e.g., iI1lOo08B) from the password.
 * 
 * The component uses the `useAtom` hook from Jotai to manage the state of the password generator options.
 */
export const PasswordGeneratorForm = () => {
    const [passwordGenerator, setPasswordGenerator] = useAtom(passwordGeneratorAtom);

    return <div className="password-generator-form">
        <Field label={"Password Length"}>
            <Dropdown
                style={{ width: "100px", minWidth: "100px" }}
                selectedOptions={[passwordGenerator.passwordLength?.toString()]}
                value={passwordGenerator.passwordLength?.toString()}
                onOptionSelect={(_, data) => setPasswordGenerator({ ...passwordGenerator, passwordLength: Number(data.optionValue) })}
            >
                <OptionGroup label={"Weak"}>
                    {Array(WEAK_HIGH_COUNT - WEAK_LOW_COUNT).fill(0).map((_, index) => {
                        const value = WEAK_LOW_COUNT + index + 1;
                        return <Option key={value} text={value.toString()}>{value}</Option>
                    })}
                </OptionGroup>
                <OptionGroup label={"Strong"}>
                    {Array(STRONG_HIGH_COUNT - WEAK_HIGH_COUNT).fill(0).map((_, index) => {
                        const value = WEAK_HIGH_COUNT + index + 1;
                        return <Option key={value} text={value.toString()}>{value}</Option>
                    })}
                </OptionGroup>
            </Dropdown>
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
    </div>
}