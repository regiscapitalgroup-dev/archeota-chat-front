import clsx from "clsx";
import { KTSVG } from "../../../_metronic/helpers";
import { useLayout } from "../../../_metronic/layout/core";
import { CSSProperties, useEffect, useRef, useState } from "react";

type Props = {
    title: string;
    icon?: string;
    fontIcon?: string;
    hasBullet?: boolean;
    forceOpen?: boolean;
};

const ListMenuElement: React.FC<Props> = ({ 
    children,
    title,
    icon,
    fontIcon,
    hasBullet,
    forceOpen
}) => {

    const { config } = useLayout();
    const { aside } = config;
    const [show, setShow] = useState(forceOpen??false);
    const selectorRef = useRef<HTMLDivElement>(null);
    const [styles, setStyles] = useState<CSSProperties>({ height: '0', overflow: 'hidden' });

    useEffect(() => {
        const _height = selectorRef.current?.scrollHeight;
        if(show) {
            setStyles((prev) => ({ ...prev, height: `${_height}px` }));
        }
        else
            setStyles((prev) => ({ ...prev, height: '0px' }));
    }, [show, children]);

    return (
        <div className={clsx("menu-item menu-accordion", { 'here show' : show } )}>
            <span className="menu-link" onClick={() => setShow((prev) => !prev)}>
                { hasBullet && (
                    <span className="menu-bullet">
                        <span className="bullet bullet-dot" />
                    </span>
                )}
                { icon && aside.menuIcon === 'svg' && (
                    <span className="menu-icon">
                        <KTSVG path={icon} className='svg-icon-2' />
                    </span>
                )}
                {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
                <span className='menu-title'>{title}</span>
                <span className='menu-arrow'></span>
            </span>
            <div className={clsx("menu-sub-accordion-custom")} style={styles} ref={selectorRef}>
                {children}
            </div>
        </div>
    );
};

export default ListMenuElement;