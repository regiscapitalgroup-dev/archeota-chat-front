import clsx from "clsx";
import { useState } from "react";

type Props = {
    value?: boolean;
    onClick?: Function;
}


const CheckAtomComponent = ({ value, onClick }: Props) => {
    let [status, setStatus] = useState(value ?? false);

    const handleAction = () => {
        if(!onClick)
            return;
        setStatus((prev) => !prev);
        onClick(status);
    }

    return (
        <div className={clsx('check-item', !!onClick && 'selector', status ? 'active': '')} onClick={handleAction}>
            { status &&
                <i className="bi bi-check-lg"></i> 
            }
        </div>
    )
};

export default CheckAtomComponent;