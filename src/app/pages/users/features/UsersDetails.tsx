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
import { TableColumn } from "react-data-table-component";
import DataTableComponent from "../../../components/DataTableComponent";
import { getCountryData } from "../../../helpers/countryData";


const _assigned = [
    {
        id: 1,
        firstName: 'Carlos',
        lastName: 'Martínez',
        country: 'Mexico',
        nationalId: 'MABC900101HDFRRL01',
        classifier:  {
            name: 'South Zone',
            color: 'classifier-5'
        }
    },
    {
        id: 2,
        firstName: 'Emily',
        lastName: 'Johnson',
        country: 'United States',
        nationalId: '532-44-9123',
        classifier: {
            name: 'South Zone',
            color: 'classifier-5'
        }
    },
    {
        id: 3,
        firstName: 'Sofía',
        lastName: 'González',
        country: 'Argentina',
        nationalId: '27.345.982',
        classifier: {
            name: 'South Zone',
            color: 'classifier-5'
        }
    },
    {
        id: 4,
        firstName: 'Liam',
        lastName: 'Brown',
        country: 'Canada',
        nationalId: 'A1234-5678',
        classifier: {
            name: 'South Zone',
            color: 'classifier-5'
        }
    },
    {
        id: 5,
        firstName: 'Andrea',
        lastName: 'Rossi',
        country: 'Italy',
        nationalId: 'RSSNDR90A01F205X',
        classifier: {
            name: 'South Zone',
            color: 'classifier-5'
        }
    },
    {
        id: 6,
        firstName: 'Hiroshi',
        lastName: 'Tanaka',
        country: 'Japan',
        nationalId: '123456789012',
        classifier: {
            name: 'South Zone',
            color: 'classifier-5'
        }
    },
    {
        id: 7,
        firstName: 'Laura',
        lastName: 'Schmidt',
        country: 'Germany',
        nationalId: 'LRSCH900101',
        classifier: {
            name: 'South Zone',
            color: 'classifier-5'
        }
    }
];


const UsersDetails = () => {
    const history = useHistory();
    const [previewImage] = useState<string | null>(null);
    const [user, setUser] = useState<UserListModel>();
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState<{ code: string, country: string, phoneCode: string, flag: string, } | null>(null);
    const [classifier, setClassifier] = useState<ClassifierModel | null>(null);
    const {id: routeId} = useParams<RouteParamsModel>();


    const _columnsAssigned: TableColumn<any>[] = [
        {
            name: 'First name',
            selector: (row) => row.firstName,
            sortable: true,
        },
        {
            name: 'Last name',
            selector: (row) => row.lastName,
            sortable: true,
        },
        {
            name: 'Country',
            cell: (row) => {
                const _data = getCountryData(row.country);
                return (
                <label className="text-nowrap"> 
                    <img className="me-1" src={_data.flag} alt={_data.country}  style={{ width: "20px", height: "15px", objectFit: "cover" }}/>  
                    { _data.country }
                </label>)
            },
            sortable: true,
        },
        {
            name: 'National ID',
            selector: (row) => row.nationalId,
            sortable: true,
        },
        {
            name: 'Classification',
            cell: (row) => (<div className={clsx('badge fw-bolder text-uppercase text-nowrap classifier', row.classifier.color)}>{row.classifier.name}</div>),
            sortable: true,
        },
    ];

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
                        <>  
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
                                            <span className="fs-2 fw-bold text-nowrap"> <i className="bi bi-envelope-fill"></i> <a href={`mailto:${user?.email}`} style={{ color: 'black' }}> { user?.email } </a> </span>
                                        </div>
                                        <div className="d-inline-flex flex-column p-4">
                                            <label className="fw-light">Role</label>
                                            <span className='text-truncate fs-2 fw-bold'>
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
                            <div className="separator mt-5 mb-5"></div>
                            <div>
                                <span className='fw-bolder text-dark'>Users assigned</span>
                                <div>
                                    <DataTableComponent 
                                        columns={_columnsAssigned}
                                        data={_assigned}
                                        pagination
                                        paginationServer={false}
                                        totalRows={_assigned.length}
                                        customTitle={null}
                                        highlightOnHover
                                    />
                                </div>
                            </div>
                        </>
                    }
                    <button className="btn btn-light" onClick={() => history.push('/users')}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
};

export default UsersDetails;