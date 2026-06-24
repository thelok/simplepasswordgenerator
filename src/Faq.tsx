import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from "@fluentui/react-components";
import { FAQ } from "./content/faq";

export const Faq = () => {
    return (
        <div className="usage-reasons">
            <h2>Frequently asked questions</h2>
            <Accordion collapsible multiple>
                {FAQ.map((f, i) => (
                    <AccordionItem key={i} value={i}>
                        <AccordionHeader as="h3">{f.q}</AccordionHeader>
                        <AccordionPanel>{f.a}</AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};
