import { useMemo, useState } from "react";
import Select from "react-select";
import { filterData } from "../../../services/utilsService";
import { getCountryData } from "../../../helpers/countryData";
import { Classifiers } from "../mock/classifiers.mock";
import clsx from "clsx";

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
    isStaff: boolean;
    phoneNumber: string;
    usersAssigned: number;
    country: string;
    classifier_id: number;
    users: number[];
}




const clientsAvailables = [
    {
        id: 0,
        firstName: 'Carlos',
        lastName: 'Martínez',
        country: 'Mexico',
        nationalId: 'MABC900101HDFRRL01',
        classifier_id: 2
    },
    {
        id: 1,
        firstName: 'Emily',
        lastName: 'Johnson',
        country: 'United States',
        nationalId: '532-44-9123',
        classifier_id: 1
    },
    {
        id: 2,
        firstName: 'Sofía',
        lastName: 'González',
        country: 'Argentina',
        nationalId: '27.345.982',
        classifier_id: 3
    },
    {
        id: 3,
        firstName: 'Liam',
        lastName: 'Brown',
        country: 'Canada',
        nationalId: 'A1234-5678',
        classifier_id: 0
    },
    {
        id: 4,
        firstName: 'Andrea',
        lastName: 'Rossi',
        country: 'Italy',
        nationalId: 'RSSNDR90A01F205X',
        classifier_id: 1
    }
]; 


let _users: IUser[] = [
    {
        id: 5,
        firstName: "Jose",
        lastName: "Perez",
        email: "mock@gmail.com",
        role: "COMPANY MANAGER",
        isActive: true,
        isStaff: false,
        phoneNumber: '(+52)9991234455',
        usersAssigned: 5,
        country: 'Mexico',
        classifier_id: 3,
        users: [0]
    },
    {
        id: 6,
        firstName: "Luis",
        lastName: "Perez",
        email: "mock@gmail.com",
        role: "COMPANY MANAGER",
        isActive: true,
        isStaff: true,
        phoneNumber: '(+52)9991234455',
        usersAssigned: 1,
        country: 'United States of America',
        classifier_id: 1,
        users: [1,2]
    },
    {
        id: 7,
        firstName: "Pedro",
        lastName: "Marquez",
        email: "mock@gmail.com",
        role: "COMPANY MANAGER",
        isActive: false,
        isStaff: false,
        phoneNumber: '(+52)9991234455',
        usersAssigned: 0,
        country: 'Albania',
        classifier_id: 2,
        users: [3]
    },
    {
        id: 8,
        firstName: "Ivan",
        lastName: "Gutierrez",
        email: "mock@gmail.com",
        role: "COMPANY MANAGER",
        isActive: false,
        isStaff: true,
        phoneNumber: '(+52)9991234455',
        usersAssigned: 10,
        country: 'Argentina',
        classifier_id: 0,
        users: [4]
    }
];

const UsersAssignemt = () => {
    const [users, setUsers] = useState<IUser[]>(_users);
    const [userSelected, setUserSelected] = useState<IUser|null>(null);
    const [usersAssigned, setUsersAssigned] = useState<any[]>([]);
    const [usersAvailable, setUsersAvailable] = useState<any[]>([]);
    const [assignSelected, setAssignSelected] = useState<number[]>([]);
    const [unassignSelected, setUnassignSelected] = useState<number[]>([]);
    
    const [filterAssigned, setFilterAssigned] = useState('');  
    const [filterClassifierAssigned, setFilterClassifierAssigned] = useState<number|null>(null);  
    const usersAssignedFiltered = useMemo(() => filterData(usersAssigned, { firstName: filterAssigned, classifier_id: filterClassifierAssigned!==null ? String(filterClassifierAssigned) : ''  }), [usersAssigned, filterClassifierAssigned, filterAssigned])
    
    const [filterAvailables, setFilterAvailables] = useState('');  
    const [filterClassifierAvailables, setFilterClassifierAvailables] = useState<number|null>(null);  
    const usersAvailableFiltered = useMemo(() => filterData(usersAvailable, { firstName: filterAvailables, classifier_id: filterClassifierAvailables!==null ? String(filterClassifierAvailables) : '' }), [usersAvailable, filterClassifierAvailables, filterAvailables])


    const _handleUserSelect = (e: { value: IUser, label: string }) => {
        setUserSelected(e.value);
        const _assigned = clientsAvailables.filter(c => e.value.users.includes(c.id));
        setUsersAssigned(_assigned);
        const _available = clientsAvailables.filter(c => !e.value.users.includes(c.id));
        setUsersAvailable(_available);
    }

    const _handleUnassignSelect = (e: any, id: number) => {
        setUnassignSelected(prev =>
            !e.target.checked ? prev.filter(p => p !== id) : [...prev, id]
        );        
    }

    const _handleAssignSelect = (e: any, id: number) => {
        setAssignSelected(prev =>
            !e.target.checked ? prev.filter(p => p !== id) : [...prev, id]
        );
    }


    const _assign = () => {
        if(!userSelected)
            return;
        //db job
        const usersDuplicate = [...users];
        const _idx = usersDuplicate.findIndex(u => u.id === userSelected.id)
        if(_idx<=-1)
            return;
        usersDuplicate[_idx].users = [...usersDuplicate[_idx].users, ...assignSelected];
        setUsers(usersDuplicate);
        //Reload data
        _handleUserSelect({value: usersDuplicate[_idx], label: ""})
    };

    const _unassign = () => {
        if(!userSelected)
            return;
        //db job
        const usersDuplicate = [...users];
        const _idx = usersDuplicate.findIndex(u => u.id === userSelected.id)
        if(_idx<=-1)
            return;
        usersDuplicate[_idx].users = usersDuplicate[_idx].users.filter(udx => !unassignSelected.includes(udx));
        setUsers(usersDuplicate);
        //Reload data
        _handleUserSelect({value: usersDuplicate[_idx], label: ""})
    }

    const _getClassifier = (id: number) => Classifiers.find(c => c.id === id);

    return (
        <div className="card shadow-sm  mb-10">
            <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
                <h3 className='card-title align-items-start flex-column'>
                    <span className='fw-bolder text-dark fs-3'>Users Assignment</span>
                    <span className='text-muted mt-1 fs-7'>List of users</span>
                </h3>
            </div>
            <div className="card-body py-3 d-flex flex-column gap-2 align-items-center">
                <div className="w-50">
                    <Select 
                        options={users.map(u => ({ value: u, label: `${u.firstName} ${u.lastName}`}))}
                        onChange={_handleUserSelect}
                    />
                </div>
                { userSelected && (
                    <>
                        <div className="d-flex flex-row gap-2 w-100">
                            <div className="card shadow-sm flex-fill w-50">
                                <div className="card-header border-0 pt-5 d-flex flex-column">
                                    <h3 className="card-title">
                                        <span className="fw-bolder text-dark fs-4">
                                            Available Clients
                                        </span>
                                    </h3>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="bi bi-search"></i></span>
                                        <input type="text" className="form-control" placeholder="Search an user" onChange={(e) => setFilterAvailables(e.target.value)}/>
                                    </div>
                                    <div className="d-flex flex-row gap-2">
                                        <span className={clsx("badge cursor-pointer badge-dark classifier", filterClassifierAvailables===null?'border-selected':'')} onClick={() => setFilterClassifierAvailables(null)}>
                                            All
                                        </span>
                                        { Classifiers.map((c, i) => (
                                            <span key={i} className={clsx('badge classifier cursor-pointer', c.color, filterClassifierAvailables===c.id?'border-selected':'')} onClick={() => setFilterClassifierAvailables(c.id)}>
                                                { c.name }
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-body py-3 d-inline-flex flex-column gap-3">
                                    { usersAvailableFiltered.map((c, i) => (
                                        <label key={c.id} className="card shadow-sm cursor-pointer">
                                            <div className="card-body d-flex flex-row">
                                                <div className="row w-100">
                                                    <div className="col-12 col-lg-6">
                                                        <span> { c.firstName } {c.lastName} </span>
                                                        <div>
                                                            <label className="text-nowrap"> <img style={{ width: "20px", height: "15px", objectFit: "cover" }} src={getCountryData(c.country).flag} alt={getCountryData(c.country).country} /> {getCountryData(c.country).country} </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <span className="d-block text-nowrap"> {c.nationalId} </span>
                                                        <div className={clsx('badge classifier', _getClassifier(c.classifier_id)?.color)}> { _getClassifier(c.classifier_id)?.name } </div>
                                                    </div>
                                                </div>
                                                <div className="form-check ms-auto mt-auto mb-auto">
                                                    <input type="checkbox" className="form-check-input" onChange={(e) => _handleAssignSelect(e, c.id)} />
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="card shadow-sm flex-fill w-50">
                                <div className="card-header border-0 pt-5 d-flex flex-column">
                                    <h3 className="card-title">
                                        <span className="fw-bolder text-dark fs-4">
                                            Clients Assigned to {userSelected.firstName} {userSelected.lastName}
                                        </span>
                                    </h3>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="bi bi-search"></i></span>
                                        <input type="text" className="form-control" placeholder="Search an user" onChange={(e) => setFilterAssigned(e.target.value)}/>
                                    </div>
                                    <div className="d-flex flex-row gap-2">
                                        <span className={clsx("badge cursor-pointer badge-dark classifier", filterClassifierAssigned===null?'border-selected':'')} onClick={() => setFilterClassifierAssigned(null)}>
                                            All
                                        </span>
                                        { Classifiers.map((c, i) => (
                                            <span key={i} className={clsx('badge classifier cursor-pointer', c.color, filterClassifierAssigned===c.id?'border-selected':'')} onClick={() => setFilterClassifierAssigned(c.id)}>
                                                { c.name }
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="card-body py-3 d-inline-flex flex-column gap-3">
                                    { usersAssignedFiltered.map((c, i) => (
                                        <label key={i} className="card shadow-sm cursor-pointer">
                                            <div className="card-body d-flex flex-row">
                                                <div className="row w-100">
                                                    <div className="col-12 col-lg-6">
                                                        <span> { c.firstName } {c.lastName} </span>
                                                        <div>
                                                            <label className="text-nowrap"> <img style={{ width: "20px", height: "15px", objectFit: "cover" }} src={getCountryData(c.country).flag} alt={getCountryData(c.country).country} /> {getCountryData(c.country).country} </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <span className="d-block text-nowrap"> {c.nationalId} </span>
                                                        <div className={clsx('badge classifier', _getClassifier(c.classifier_id)?.color)}> { _getClassifier(c.classifier_id)?.name } </div>
                                                    </div>
                                                </div>
                                                <div className="form-check ms-auto">
                                                    <input type="checkbox" className="form-check-input" onChange={(e) => _handleUnassignSelect(e, c.id)}/>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>    
                        <div className="card-footer d-flex flex-row gap-2 justify-content-center w-100">
                            <button className="ms-1 btn btn-primary" onClick={_assign}>
                                <i className="bi bi-arrow-right-circle-fill"></i>
                                Asignar seleccionados
                            </button>
                            
                            <button className="btn btn-outline-primary border border-1 border-primary" onClick={_unassign}>
                                <i className="bi bi-arrow-left-circle-fill"></i>
                                Desasignar seleccionados
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
};

export default UsersAssignemt;