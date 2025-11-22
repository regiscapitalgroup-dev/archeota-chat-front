import clsx from "clsx";
import { KTSVG } from "../../../_metronic/helpers";
import { useEffect, useRef, useState } from "react";

type Props = {
    title: any;
    isOpen: boolean;
    onToogle: () => void;
    children: any;
};

const AccordionItem = ({ title, isOpen, onToogle, children }: Props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState("0px");

    useEffect(() => {
        if(contentRef.current)
            setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }, [isOpen]);

    return (
        <div className={clsx("custom-accordion-item", isOpen && 'opened')}>
            <button className="accordion-item-header" onClick={onToogle}>
                <div className="accordion-item-icon">
                    <KTSVG
                        className={clsx("svg-icon svg-icon-4", isOpen && 'svg-icon-primary')}
                        path="media/icons/duotune/arrows/arr064.svg"
                    />
                </div>
                <span className="accordion-item-title form-label">
                    {title}
                </span>
            </button>
            <div ref={contentRef} style={{ height: height }} className={clsx("accordion-item-content")}>
                { children }
            </div>
        </div>
    )
}

export default AccordionItem;