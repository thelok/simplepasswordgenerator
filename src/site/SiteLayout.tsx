import { FluentProvider, ToggleButton, Tooltip, tokens, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { themeAtom } from "../state/state";

interface ISiteLayoutProps {
    children?: React.ReactNode;
}

const prefersDarkQuery = "(prefers-color-scheme: dark)";

export const SiteLayout = (props: ISiteLayoutProps) => {
    const [pref, setPref] = useAtom(themeAtom);
    const [systemDark, setSystemDark] = useState(() => window.matchMedia(prefersDarkQuery).matches);

    useEffect(() => {
        const mq = window.matchMedia(prefersDarkQuery);
        const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const isDark = pref === "dark" || (pref === "system" && systemDark);
    const theme = useMemo(() => (isDark ? webDarkTheme : webLightTheme), [isDark]);

    useEffect(() => {
        document.body.style.backgroundColor = theme.colorNeutralBackground1;
        document.body.style.color = theme.colorNeutralForeground1;
    }, [theme]);

    return (
        <FluentProvider theme={theme} style={{ minHeight: "100vh", background: tokens.colorNeutralBackground1 }}>
            <div style={{ position: "fixed", top: 12, right: 12, zIndex: 10 }}>
                <Tooltip content={isDark ? "Switch to light mode" : "Switch to dark mode"} relationship="label">
                    <ToggleButton
                        appearance="subtle"
                        checked={isDark}
                        icon={isDark ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
                        onClick={() => setPref(isDark ? "light" : "dark")}
                    />
                </Tooltip>
            </div>
            {props.children}
        </FluentProvider>
    );
};
