export interface ReasonItem { title: string; reason: string }

export const REASONS: ReasonItem[] = [
    { title: "Enhanced Security", reason: "Since passwords are generated client-side, they never travel over the network, ensuring that they remain private and secure." },
    { title: "Strong, Random Passwords", reason: "The site can create complex and unpredictable passwords, making them highly resistant to hacking attempts." },
    { title: "User-Friendly", reason: "The process is straightforward and doesn’t require any technical expertise, making it accessible for everyone." },
    { title: "Customizable Options", reason: "Passwords can be tailored to meet specific requirements, such as length and the inclusion of special characters." },
    { title: "Convenience", reason: "Strong passwords can be generated quickly and easily, saving time and effort compared to coming up with them manually." },
    { title: "No Network Calls", reason: "Once the page loads, generating passwords makes zero network requests — everything runs locally in your browser, so nothing can be intercepted or logged." },
    { title: "Free to Use", reason: "The password generator is completely free to use, with no hidden charges or subscriptions." },
];
