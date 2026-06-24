export interface FaqItem { q: string; a: string }

export const FAQ: FaqItem[] = [
    {
        q: "Is this password generator safe?",
        a: "Yes. Passwords are generated entirely in your browser using the Web Crypto API (crypto.getRandomValues) with unbiased rejection sampling. Nothing is sent to any server, nothing is logged, and the source code is open on GitHub for anyone to audit.",
    },
    {
        q: "How do I generate a password without special characters?",
        a: "Uncheck both \"Use simple symbols\" and \"Use complex symbols\" in the settings panel. The generator will produce a password using only letters and numbers. You can also exclude specific characters using the \"Also exclude these characters\" field.",
    },
    {
        q: "What is a Diceware passphrase?",
        a: "A Diceware passphrase is a password made of several randomly chosen dictionary words, like \"acorn-cheek-frog-tulip\". They are easier to remember and type than random characters while still being very strong. Switch to the Passphrase tab to generate one using the EFF short wordlist.",
    },
    {
        q: "How long should my password be?",
        a: "For most accounts, 16–20 random characters from a mixed character set is plenty (over 100 bits of entropy). For high-value accounts or master passwords, use 24+ characters or a 6-word passphrase. The strength meter shows the entropy and estimated crack time as you adjust the slider.",
    },
    {
        q: "Can I exclude ambiguous characters like 0, O, 1, and l?",
        a: "Yes — turn on \"Exclude ambiguous characters\" to remove iI1lOo08B from the character set. This makes passwords easier to read aloud or type from paper without reducing strength much.",
    },
    {
        q: "Does this work without an internet connection?",
        a: "Generation itself makes no network calls — once the page is loaded, you can disconnect and keep generating. You do need a connection to load the page initially.",
    },
];
