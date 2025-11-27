import React from "react";
import ReactDOM from "react-dom";
import Swal, { SweetAlertOptions } from "sweetalert2";

type Props = {
    children: JSX.Element,
    options: SweetAlertOptions
}

const ComponentModalTemplate = async ({ children, options }: Props) => 
await Swal.fire({
    ...options,
    html: '<div id="react-component-content"></div>',
    willClose: () => {
        const container = document.getElementById("react-component-content");
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
        }
    },
    didOpen: () => {
        const container = document.getElementById("react-component-content");
        if (container) {
            const confirm = () => Swal.close({ isConfirmed: true });
            const cancel = () => Swal.close({ isConfirmed: false });
            ReactDOM.render(
                React.cloneElement(children, { confirm, cancel }), 
                container);
            
        }
    },
});

export default ComponentModalTemplate;