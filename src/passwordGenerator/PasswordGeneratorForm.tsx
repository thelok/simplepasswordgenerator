import { Checkbox, Field, Input, Slider, Tab, TabList } from "@fluentui/react-components";
import { useAtom } from "jotai";
import { passwordGeneratorAtom } from "../state/state";
import { GeneratorMode } from "./PasswordGeneratorData";
import { PasswordStrength } from "./PasswordStrength";
import "./passwordgenerator.scss";

const MIN_LENGTH = 6;
const MAX_LENGTH = 64;
const MIN_WORDS = 3;
const MAX_WORDS = 10;

export const PasswordGeneratorForm = () => {
    const [opts, setOpts] = useAtom(passwordGeneratorAtom);
    const mode = opts.mode ?? "password";

    return <div className="password-generator-form">
        <TabList
            selectedValue={mode}
            onTabSelect={(_, d) => setOpts({ ...opts, mode: d.value as GeneratorMode })}
        >
            <Tab value="password">Password</Tab>
            <Tab value="passphrase">Passphrase</Tab>
        </TabList>

        {mode === "password" && <>
            <Field label={`Password Length: ${opts.passwordLength}`}>
                <Slider
                    min={MIN_LENGTH}
                    max={MAX_LENGTH}
                    value={opts.passwordLength}
                    onChange={(_, data) => setOpts({ ...opts, passwordLength: data.value })}
                />
            </Field>
            <Checkbox
                label={<><span>Use alpha characters?</span><span className="opaque"> (A-Z and a-z)</span></>}
                checked={opts.isUseAlpha}
                onChange={() => setOpts({ ...opts, isUseAlpha: !opts.isUseAlpha })}
            />
            <Checkbox
                label={<><span>Use numeric characters?</span><span className="opaque"> (0-9)</span></>}
                checked={opts.isUseNumeric}
                onChange={() => setOpts({ ...opts, isUseNumeric: !opts.isUseNumeric })}
            />
            <Checkbox
                label={<><span>Use simple symbols?</span><span className="opaque"> (typical characters found at top of keyboard <span className="code">!@#$%^&*()-=_+</span>)</span></>}
                checked={opts.isUseSimpleSymbols}
                onChange={() => setOpts({ ...opts, isUseSimpleSymbols: !opts.isUseSimpleSymbols })}
            />
            <Checkbox
                label={<><span>Use complex symbols?</span><span className="opaque code"> ("',./:;&lt;&gt;?[\]`&#123;|&#125;~)</span></>}
                checked={opts.isUseComplexSymbols}
                onChange={() => setOpts({ ...opts, isUseComplexSymbols: !opts.isUseComplexSymbols })}
            />
            <Checkbox
                label={<><span>Exclude ambiguous characters?</span><span className="opaque"> (Excludes: <span className="code"> iI1lOo08B)</span></span></>}
                checked={opts.isExcludeAmbiguousCharacters}
                onChange={() => setOpts({ ...opts, isExcludeAmbiguousCharacters: !opts.isExcludeAmbiguousCharacters })}
            />
        </>}

        {mode === "passphrase" && <>
            <Field label={`Number of words: ${opts.wordCount ?? 5}`}>
                <Slider
                    min={MIN_WORDS}
                    max={MAX_WORDS}
                    value={opts.wordCount ?? 5}
                    onChange={(_, data) => setOpts({ ...opts, wordCount: data.value })}
                />
            </Field>
            <Field label="Separator">
                <Input
                    value={opts.separator ?? "-"}
                    maxLength={3}
                    style={{ width: 80 }}
                    onChange={(_, d) => setOpts({ ...opts, separator: d.value })}
                />
            </Field>
            <Checkbox
                label={<><span>Capitalize each word?</span><span className="opaque"> (Acorn-Cheek-Frog)</span></>}
                checked={opts.capitalizeWords ?? false}
                onChange={() => setOpts({ ...opts, capitalizeWords: !opts.capitalizeWords })}
            />
            <Checkbox
                label={<><span>Append a 2-digit number?</span><span className="opaque"> (satisfies "must contain a number" rules)</span></>}
                checked={opts.appendNumber ?? false}
                onChange={() => setOpts({ ...opts, appendNumber: !opts.appendNumber })}
            />
            <div className="opaque" style={{ fontSize: 12 }}>
                Words drawn from the EFF short wordlist (1,296 words, ~10.3 bits each).
            </div>
        </>}

        <PasswordStrength />
    </div>
}
