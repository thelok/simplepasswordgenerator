interface IReasonProps {
    title: string;
    reason: string
}

export const Reason = (props: IReasonProps) => {
    return <li>
        <b>{props.title}: </b><span>{props.reason}</span>
    </li>
}