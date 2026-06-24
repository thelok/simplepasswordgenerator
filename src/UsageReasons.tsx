import { REASONS } from "./content/reasons"
import { Reason } from "./Reason"

export const UsageReasons = () => {
    return <div className="usage-reasons">
        <h2>Why use Simple Password Generator?</h2>
        <ul>
            {REASONS.map((r) => <Reason key={r.title} title={r.title} reason={r.reason} />)}
        </ul>
    </div>
}
