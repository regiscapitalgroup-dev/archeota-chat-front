import { useHistory, useParams } from "react-router-dom";
import { RouteParamsModel } from "../../../shared/models/RouteParamsModel";
import { useEffect } from "react";
import { useClaimDetails } from "../../../../hooks/claims/useClaimDetails";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ClaimsDetailsTable from "../../components/molecules/ClaimsDetailsTable";

const ClaimActionsDetails = () => {
    const history = useHistory();
    const {id: routeId} = useParams<RouteParamsModel>();
    const { loading, data, loadClaim } = useClaimDetails(Number(routeId));



    return (
        <div className='card shadow-sm mb-10'>
            <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='fw-bolder text-dark fs-3'>Claims Details</span>
                    <span className='text-muted mt-1 fs-7'>Claim information</span>
                </h3>
            </div>
            <div className="card-body">
                { loading ? <LoadingSpinner message="Loading..."/> : (
                    <>
                        <div className="d-flex flex-row flex-wrap">
                            <div className="d-inline-flex flex-column p-4">
                                <label className="fw-light">Ticker symbol</label>
                                <span className="fw-bold">{ data?.tyckerSymbol }</span>
                            </div>

                            <div className="d-inline-flex flex-column p-4">
                                <label className="fw-light">Company name</label>
                                <span className="fw-bold">{ data?.companyName }</span>
                            </div>

                            <div className="d-inline-flex flex-column p-4">
                                <label className="fw-light">Lawsuit type</label>
                                <span className="fw-bold">{ data?.lawsuitType }</span>
                            </div>

                            <div className="d-inline-flex flex-column p-4">
                                <label className="fw-light">Total settlement</label>
                                <span className="fw-bold">{ data?.totalSettlementFund }</span>
                            </div>

                            <div className="d-inline-flex flex-column p-4">
                                <label className="fw-light">Filing date</label>
                                <span className="fw-bold">{ data?.filingDate }</span>
                            </div>

                            <div className="d-inline-flex flex-column p-4">
                                <label className="fw-light">Claim deadline</label>
                                <span className="fw-bold">{ data?.claimDeadline }</span>
                            </div>

                            <div className="d-inline-flex flex-column p-4">
                                <label className="fw-light">Eligibility</label>
                                <span className="fw-bold">{ data?.eligibility }</span>
                            </div>
                        </div>
                        { data?.classActionsLawsuits && (
                            <div>

                                <div className="separator mb-2"></div>
                                <ClaimsDetailsTable 
                                    classes={data?.classActionsLawsuits}
                                    />
                            </div>
                        )}
                    </>

                )}
            </div>
        </div>
    )
}

export default ClaimActionsDetails;