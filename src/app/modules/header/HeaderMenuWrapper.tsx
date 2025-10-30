import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MenuComponent } from "../../../_metronic/assets/ts/components";
import { useLayout } from "../../../_metronic/layout/core";
import clsx from "clsx";
import { KTSVG } from "../../../_metronic/helpers";
import { Header } from "../../../_metronic/layout/components/header/Header";
import HeaderTopbar from "./HeaderTopbar";



const HeaderMenuWrapper: React.FC = () => {
    const {pathname} = useLocation();
    const {config, classes, attributes} = useLayout();
    const {header, aside} = config

    useEffect(() => {
        MenuComponent.reinitialization();
    }, [pathname]);
    
    return (
        <div 
            id="kt_header" 
            className={clsx('header', ...classes.header, 'align-items-stretch')} 
            {...attributes.headerMenu}
        >
            <div className={clsx(
                    ...classes.headerContainer,
                    'd-flex align-items-stretch justify-content-between'
                )}
            >
                { aside.display && (
                    <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
                        <div
                            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
                            id='kt_aside_mobile_toggle'
                        >
                            <KTSVG path='/media/icons/duotune/abstract/abs015.svg' className='svg-icon-2x mt-1' />
                        </div>
                    </div>
                )}

                <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
                    { header.left === 'menu' && (
                        <div className='d-flex align-items-stretch' id='kt_header_nav'>
                            <Header />
                        </div>
                    )}

                    { header.left === 'page-title' && (
                        <div className='d-flex align-items-center' id='kt_header_nav'>
                            {/* <DefaultTitle /> */}
                        </div>
                    )}
                    <div className='d-flex align-items-stretch flex-shrink-0'>
                        <HeaderTopbar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMenuWrapper;