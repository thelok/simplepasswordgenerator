import { FluentProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { useMemo } from "react";

/**
 * Interface representing the properties for the SiteLayout component.
 */
interface ISiteLayoutProps {
    children?: React.ReactNode;
}

/**
 * SiteLayout component that provides theming and layout for the application.
 * @param props - The properties for the SiteLayout component.
 */
export const SiteLayout = (props: ISiteLayoutProps) => {
    const theme = useMemo(() => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? webDarkTheme : webLightTheme;
    }, []);

    return <FluentProvider theme={theme}>
        {props.children}
    </FluentProvider>
}