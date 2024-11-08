import { makeStyles, mergeClasses } from "@fluentui/react-components";
import { bundleIcon, ClipboardBulletListFilled, ClipboardBulletListRegular, iconFilledClassName, iconRegularClassName } from "@fluentui/react-icons";
import { useState } from "react";

interface IPasswordProps {
    password: string;
}

const useClasses = makeStyles({
    clipboard: {
        fontSize: "24px",
        ":hover": {
            [`& .${iconFilledClassName}`]: {
                display: "block",
            },
            [`& .${iconRegularClassName}`]: {
                display: "none",
            },
        },
    },
});


const ClipboardIcon = bundleIcon(ClipboardBulletListFilled, ClipboardBulletListRegular);

export const Password = (props: IPasswordProps) => {
    const classes = useClasses();
    const [isAnimating, setIsAnimating] = useState<boolean>(false);


    const onCopy = () => {
        navigator.clipboard.writeText(props.password);

        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 2000); // Reset after 2 seconds

    }

    return <div className={mergeClasses("password-container")}>
        <div title="Copy" className={mergeClasses("clipboard", classes.clipboard)} onClick={onCopy}><ClipboardIcon /></div>
        <div className={(isAnimating ? 'gradient-text' : '') + " password code"}>{props.password}</div>
    </div>
}