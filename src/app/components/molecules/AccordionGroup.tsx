import { useState } from "react";
import AccordionItem from "../atoms/AccordionItem";
import { AccordionItemModel } from "../atoms/Models/AccordionItemModel";


type Props = {
    items: AccordionItemModel[];
};

const AccordionGroup = ({ items }: Props) => {
    const [indexSelected, setIndexSelected] = useState<number | null>(null);
    const openItem = (index: number) => setIndexSelected(indexSelected === index ? null : index);
    return (
        <div className="accordion-group">
            {items.map((item, idx) => (
                <AccordionItem 
                    key={idx} 
                    title={item.title} 
                    isOpen={indexSelected===idx} 
                    onToogle={()=>openItem(idx)}
                >
                    {item.children}
                </AccordionItem>
            ))}
        </div>
    )
}

export default AccordionGroup;