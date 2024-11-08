import { FluentProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { useMemo } from "react";

interface ISiteLayoutProps {
    children?: React.ReactNode;
}

export const SiteLayout = (props: ISiteLayoutProps) => {
    const theme = useMemo(() => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? webDarkTheme : webLightTheme;
    }, []);

    return <FluentProvider theme={theme}>
        {props.children}
    </FluentProvider>
}