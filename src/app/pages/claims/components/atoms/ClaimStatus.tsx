import clsx from "clsx";
import { ClaimStatusEnum } from "./enums/ClaimStatusEnum";
import { useEffect, useState } from "react";

type Props = {
    type: ClaimStatusEnum;
}

const ClaimStatus = ({type }: Props) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
    }, [type]);

    const text = {
        Success: "Actions correctly claimed",
        Error: "There was an error while requesting the claim. Please try again.",
        Loading: "Requesting the claim action"
    }[ClaimStatusEnum[type]] ?? '';    
    return (
        <>
            { visible && (
                <div className={
                        clsx('alert alert-dismissible fade show', 
                            { 'alert-primary': type===ClaimStatusEnum.Loading, 
                              'alert-danger': type===ClaimStatusEnum.Error, 
                              'alert-success': type===ClaimStatusEnum.Success 
                            }
                        )} role="alert">
                    {text}
                    { type===ClaimStatusEnum.Loading && (
                        <span className="spinner-border spinner-border-sm align-middle ms-2" />
                    )}
                    { type!==ClaimStatusEnum.Loading && (
                        <button type="button" className="btn-close" onClick={() => setVisible(false)}></button>
                    )}
                </div>
            )}
        </>
    )
}

export default ClaimStatus;