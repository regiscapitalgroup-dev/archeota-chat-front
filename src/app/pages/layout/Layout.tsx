import React from "react";
import { Content } from "../../../_metronic/layout/components/Content";
import { Footer } from "../../../_metronic/layout/components/Footer";
import AsideWrapper from "../../modules/aside/AsideWrapper";
import HeaderMenuWrapper from "../../modules/header/HeaderMenuWrapper";
import { Toolbar } from "../../../_metronic/layout/components/toolbar/Toolbar";
import { PageDataProvider } from "../../../_metronic/layout/core";
import { ScrollTop } from "../../../_metronic/layout/components/ScrollTop";
import { MasterInit } from "../../../_metronic/layout/MasterInit";

const Layout: React.FC = ({children}) => {
    return (
        <PageDataProvider>
            <div className="page d-flex flex-row flex-column-fluid">
                <AsideWrapper />
                <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
                    <HeaderMenuWrapper />
                    <div className='content d-flex flex-column flex-column-fluid' id='kt_content'>
                        <Toolbar />
                        <div className="post d-flex flex-column-fluid" id="kt_post">
                            <Content>
                                {children}
                            </Content>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            <MasterInit />
            <ScrollTop />
        </PageDataProvider>
    );
};

export default Layout;