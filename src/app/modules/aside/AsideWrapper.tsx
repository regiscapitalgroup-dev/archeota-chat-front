import clsx from "clsx";
import { useLayout } from "../../../_metronic/layout/core";
import { Link } from "react-router-dom";
import { KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
import AsideMenuWrapper from "./AsideMenuWrapper";

const AsideWrapper = () => {
    const {config, classes} = useLayout();
    const {aside} = config;

    return (
        <div id="kt_aside"
            className={clsx('aside dark', classes.aside.join(' '))}
            data-kt-drawer='true'
            data-kt-drawer-name='aside'
            data-kt-drawer-activate='{default: true, lg: false}'
            data-kt-drawer-overlay='true'
            data-kt-drawer-width="{default:'200px', '300px': '250px'}"
            data-kt-drawer-direction='start'
            data-kt-drawer-toggle='#kt_aside_mobile_toggle'
        >
            <div className="aside-logo flex-column-auto" id='kt_aside_logo'>
                <Link to='/assets/chat/'>
                    { aside.theme === 'dark' ? (
                            <img
                                alt='Logo'
                                className='h-100px logo'
                                src={toAbsoluteUrl('/media/logos/archeota-white.svg')}
                            />   
                        ) : (
                            <img
                                alt='Logo'
                                className='h-25px logo'
                                src={toAbsoluteUrl('/media/logos/archeota-white.svg')}
                            />
                        )
                    }
                </Link>
                { aside.minimize && (
                    <div
                        id='kt_aside_toggle'
                        className='btn btn-icon w-auto px-0 btn-active-color-secondary aside-toggle'
                        data-kt-toggle='true'
                        data-kt-toggle-state='active'
                        data-kt-toggle-target='body'
                        data-kt-toggle-name='aside-minimize'
                    >
                        <KTSVG
                            path={'/media/icons/duotune/arrows/arr080.svg'}
                            className={'svg-icon-1 rotate-180'}
                        />
                    </div>
                )}
            </div>

            <div className="aside-menu flex-column-fluid">
                <AsideMenuWrapper asideMenuCSSClasses={classes.asideMenu}/>
            </div>
        </div>
    );
};

export default AsideWrapper;