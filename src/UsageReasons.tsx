import { Reason } from "./Reason"

export const UsageReasons = () => {
    return <div className="usage-reasons">
        <div>Here are some compelling reasons to use Simple Password Generator:
        </div>
        <ul>
            <Reason title="Enhanced Security" reason="Since passwords are generated client-side, they never travel over the network, ensuring that they remain private and secure." />
            <Reason title="Strong, Random Passwords" reason="The site can create complex and unpredictable passwords, making them highly resistant to hacking attempts." />
            <Reason title="User-Friendly" reason="The process is straightforward and doesn’t require any technical expertise, making it accessible for everyone." />
            <Reason title="Customizable Options" reason="Passwords can be tailored to meet specific requirements, such as length and the inclusion of special characters." />
            <Reason title="Convenience" reason="Strong passwords can be generated quickly and easily, saving time and effort compared to coming up with them manually." />
            <Reason title="Offline Capability" reason="Passwords can be created even without an internet connection, as the generation happens client-side." />
        </ul>
    </div>
}