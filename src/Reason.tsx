/**
 * Interface representing the properties for the Reason component.
 */
interface IReasonProps {
    title: string;
    reason: string;
}

/**
 * Reason component that displays a reason with a title and description.
 * @param props - The properties for the Reason component.
 */
export const Reason = (props: IReasonProps) => {
    return <li>
        <b>{props.title}: </b><span>{props.reason}</span>
    </li>
}