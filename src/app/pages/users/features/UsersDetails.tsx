import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { ClassifierAtom } from "../../../components/atoms/ClassifierAtom";
import { CountryInfoAtom } from "../../../components/atoms/CountryInfoAtom";
import ImagePreviewAtom from "../../../components/atoms/ImagePreviewAtom";
import { getCountryData } from "../../../helpers/countryData";
import { useUserById } from "../../../hooks/users/useUserById";
import { RouteParamsModel } from "../../shared/models/RouteParamsModel";
import { AccountsAssignedDetails } from "../components/organisms/AccountsAssignedDetails";

const UsersDetails = () => {
    const history = useHistory();
    const {id: routeId} = useParams<RouteParamsModel>();
    const { loading, user } = useUserById(Number(routeId));
    const [phoneCode, setPhoneCode] = useState<string | null>(null);

    useEffect(() => {
        if(!user || !user.country)
            return;
        const _countryData = getCountryData(user.country);
        setPhoneCode(_countryData ? _countryData.phoneCode: null);
    }, [user]);

    return (
        <div className="card shadow-sm mb-10">
            <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
                <h3 className='card-title align-items-start flex-column'>
                    <span className='fw-bolder text-dark fs-3'>Users details</span>
                    <span className='text-muted mt-1 fs-7'>Information about the user</span>
                </h3>
            </div>
            <div className="card-body">
                { loading ? <LoadingSpinner message="Loading..."/> : (
                    <>
                        <div className="container">
                            <div className="d-flex flex-row flex-wrap flex-md-nowrap align-items-start gap-4">
                                <ImagePreviewAtom image={null}/>
                                <div className="d-flex flex-row flex-wrap">
                                    <div className="d-inline-flex flex-column p-4">
                                        <label className="fw-light">First Name</label>
                                        <span className="fs-2 fw-bold">{ user?.firstName }</span>
                                    </div>
                                    <div className="d-inline-flex flex-column p-4">
                                        <label className="fw-light">Last Name</label>
                                        <span className="fs-2 fw-bold">{ user?.lastName }</span>
                                    </div>
                                    <div className="d-inline-flex flex-column p-4">
                                        <label className="fw-light">Email</label>
                                        <span className="fs-2 fw-bold text-nowrap"> <i className="bi bi-envelope-fill"></i> <a href={`mailto:${user?.email}`} style={{ color: 'black' }}> { user?.email } </a> </span>
                                    </div>
                                    <div className="d-inline-flex flex-column p-4">
                                        <label className="fw-light">Role</label>
                                        <span className='text-truncate fs-2 fw-bold'>
                                            { user?.roleDescription }
                                        </span>
                                    </div>
                                    <div className="d-inline-flex flex-column p-4">
                                        <label className="fw-light">Country</label>
                                        <CountryInfoAtom 
                                            country={user?.country??''}
                                            classNameContainer="fs-2 fw-bold"
                                        />
                                    </div>
                                    <div className="d-inline-flex flex-column p-4">
                                        <label className="fw-light">Phone number</label>
                                        <label className="fs-2 fw-bold text-nowrap"> <i className="bi bi-telephone-fill"></i> { !!phoneCode && `+(${phoneCode})` } { user?.phoneNumber }</label>
                                    </div>
                                    { user?.classificationName && (
                                        <div className="d-inline-flex flex-column p-4">
                                            <label className="fw-light">Classification</label>
                                            <ClassifierAtom 
                                                className="px-2 py-1 fs-2"
                                                color={user?.classificationColor??''}
                                                name={user?.classificationName??''}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        { user?.dependents && (
                            <>
                                <div className="separator mt-5 mb-5"></div>
                                <AccountsAssignedDetails 
                                    data={user.dependents}
                                />
                            </>
                        )}
                    </>
                )}


                <button className="btn btn-light mt-5" onClick={() => history.push('/users')}>
                    Back
                </button>
            </div>
        </div>
    )
};

export default UsersDetails;