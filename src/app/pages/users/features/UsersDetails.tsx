import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useHistory, useParams } from "react-router-dom";
import { RouteParamsModel } from "../../shared/models/RouteParamsModel";
import { UserListModel } from "../models/UserListModel";
import countries from "../../../constants/countries";
import { _UserListMock } from "../mock/user_list.mock";
import { ClassifierModel } from "../models/ClassifierModel";
import { Classifiers } from "../mock/classifiers.mock";
import clsx from "clsx";

const UsersDetails = () => {
    const history = useHistory();
    const [previewImage] = useState<string | null>(null);
    const [user, setUser] = useState<UserListModel>();
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState<{ code: string, country: string, phoneCode: string, flag: string, } | null>(null);
    const [classifier, setClassifier] = useState<ClassifierModel | null>(null);
    const {id: routeId} = useParams<RouteParamsModel>();


    useEffect(() => {
        setLoading(true);
        const _user = _UserListMock.find(m => m.id === Number(routeId));
        if(!_user) {
            history.push('/users')
            return;
        }

        const _country = countries.find(c => c.country === _user.country);
        if(!!_country) {
            setCountry(_country);
        }

        const _classifier = Classifiers.find(c => _user?.classifier_id === c.id);
        if(!!_classifier){
            setClassifier(_classifier);
        }
        console.log(_classifier);
        
        setUser(_user);
        setLoading(false);
    }, [routeId]);

    return (
        <div className="card mb-10">
            <div className="card-body">
                <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
                    <h3 className="card-title align-items-start flex-column">
                        <span className='fw-bolder text-dark fs-3'>Users</span>
                        <span className='text-muted mt-1 fs-7'>User details</span>
                    </h3>
                </div>
                <div className="card-body">
                    { loading ? <LoadingSpinner message="Loading..."/> :
                    <div className="container">
                        <div className="d-flex flex-row flex-wrap flex-md-nowrap align-items-start gap-4">
                            <div 
                                className="image-input-outline image-input-wrapper rounded border"
                                style={{
                                    width: '15rem',
                                    minWidth: '15rem',
                                    height: '15rem',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    boxShadow: '0 0.5rem 1.5rem 0.5rem rgba(0, 0, 0, 0.075)',
                                    backgroundImage: (previewImage ? `url(${previewImage})`: 'url("/media/avatars/user_default.jpg")')
                                }}
                            ></div>
                            
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
                                    <span className="fs-2 fw-bold text-nowrap"> <i className="bi bi-envelope-fill"></i> <a href={`mailto:${user?.email}`}> { user?.email } </a> </span>
                                </div>
                                <div className="d-inline-flex flex-column p-4">
                                    <label className="fw-light">Role</label>
                                    <span className='badge badge-light-info fw-bolder text-uppercase px-2 py-1 text-truncate fs-2'>
                                        { user?.role }
                                    </span>
                                </div>
                                <div className="d-inline-flex flex-column p-4">
                                    <label className="fw-light">Country</label>
                                    <label className="fs-2 fw-bold text-nowrap"> <img src={country?.flag} alt={country?.country}  style={{ width: "20px", height: "15px", objectFit: "cover" }}/>  { user?.country }</label>
                                </div>
                                <div className="d-inline-flex flex-column p-4">
                                    <label className="fw-light">Phone number</label>
                                    <label className="fs-2 fw-bold text-nowrap"> <i className="bi bi-telephone-fill"></i> { user?.phoneNumber }</label>
                                </div>
                                { classifier &&
                                    <div className="d-inline-flex flex-column p-4">
                                        <label className="fw-light">Classification</label>
                                        <label className={clsx("badge fw-bolder text-uppercase px-2 py-1 text-truncate fs-2 text-nowrap classifier", classifier.color)}> 
                                             { classifier.name }
                                        </label>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default UsersDetails;