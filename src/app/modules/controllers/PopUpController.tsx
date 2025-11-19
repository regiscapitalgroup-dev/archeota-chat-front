import React, { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";


const defaultStyles: CSSProperties = {
    display: 'none'
};

type Props = {
    children: React.ReactNode;
    className?: string;
};

const PopUpController: React.FC<Props> = ({ children, className }) => {
    const [dropStyles, setDropStyles] = useState<CSSProperties>(defaultStyles);
    //** Children */
    const elements = React.Children.toArray(children).filter(React.isValidElement);
    const buttonElement = elements.find((c: React.ReactElement<any>) => c.props['data-popup-role'] === "button");
    const dropElement = elements.find((c: React.ReactElement<any>) => c.props['data-popup-role'] === "drop");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const injectCloseCb = (element: React.ReactElement) => {
        if(!element?.props?.children)
            return element;
        const children = React.Children.toArray(element.props.children);
        const injectedChildren = children.map((child) => {
            if (React.isValidElement(child) && child.props["data-popup-action"] === "close")
                return React.cloneElement(child, { closePopup: setOff });
            return child;
        });
        return React.cloneElement(element, { children: injectedChildren });
    };

    const setOff = useCallback(() => {
        const menu = wrapperRef.current?.querySelector<HTMLElement>('[data-popup-role="drop"]'); 
        const button = wrapperRef.current?.querySelector<HTMLElement>('[data-popup-role="button"]');
        if(!button || !menu) 
            return;
        setDropStyles((prev) => ({ ...prev, display:'none' }));
    }, []);

    useEffect(() => {
        setOff();
    }, [location, setOff]);


    useEffect(() => {
        const menu = wrapperRef.current?.querySelector<HTMLElement>('[data-popup-role="drop"]'); 
        const button = wrapperRef.current?.querySelector<HTMLElement>('[data-popup-role="button"]');
        if(!button || !menu) 
            return;

        const handleClickOutside = (e: MouseEvent) => {
            if(!wrapperRef.current)
                return;
            if (wrapperRef.current.contains(e.target as Node)) return;
            if(!!menu && !menu.contains(e.target as Node))
                status(false);
        };

        const updatePosition = () => {
            const wrapperWidth = wrapperRef.current?.offsetWidth;
            const rect = button.getBoundingClientRect();
            setDropStyles((prev) => ({ 
                ...prev, 
                position: 'fixed',
                top: rect.bottom,
                left: Math.max(rect.right - wrapperWidth!, 0),
                transform: `translateX(calc(-100% + ${Math.round(button.offsetWidth)}px))` 
            }));
        };

        const status = (value: boolean) => {
            setDropStyles((prev) => (
                value ? { ...prev, display: 'block' }: { ...prev, display:'none' }
            ));
        };

        const toggle = () => {
            setDropStyles((prev) => {
                if(prev.display === 'none')
                    return { ...prev, display: 'block' };
                return { ...prev, display:'none' };
            });
        };
        
        updatePosition();
        button.addEventListener('click', toggle);
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            button.removeEventListener('click', toggle);
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div ref={wrapperRef} className={className} style={{position: 'relative'}}>
            {buttonElement}
            {(    
                <div className="topbar-menu" style={dropStyles}>
                    {injectCloseCb(dropElement as React.ReactElement)}
                </div>
            )}
        </div>
    );
};

export default PopUpController;