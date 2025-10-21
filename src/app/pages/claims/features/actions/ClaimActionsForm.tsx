import React from "react";
import { ClaimsActionsModel } from "../../models/ClaimsActionsModel";

type ClaimsActionsFormProp = {
    data?: ClaimsActionsModel;
};

const ClaimsActionForm: React.FC<ClaimsActionsFormProp> = ({ data } : ClaimsActionsFormProp) => {
    


    return (
    <div className='card mb-10'>
        <div className='card-body'>
            <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className="card-title align-items-start flex-column">
                    <span className='fw-bolder text-dark fs-3'>Claims Actions</span>
                    <span className='text-muted mt-1 fs-7'>Create a claim action</span>
                </h3>
            </div>
            <div className="card-body">

            </div>
        </div>
    </div>
    );
};

export default ClaimsActionForm;