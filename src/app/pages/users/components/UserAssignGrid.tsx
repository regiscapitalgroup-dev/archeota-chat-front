import Select from "react-select";
import { _UserListMock } from "../mock/user_list.mock";


const _users = _UserListMock.map(u => ({ value: u, label: `${u.firstName} ${u.lastName}` }))


const UserAssignGrid = () => {
    return (
        <div className="card shadow-sm mb-10">
            <div className="card-header border-0 pt-5 d-flex flex-column">
                <h3 className="card-title">
                    <span className="fw-bolder text-dark fs-4">
                        Clientes disponibles
                    </span>
                </h3>
                <Select 
                    classNamePrefix='react-select' 
                    placeholder='Select an user'
                    options={_users}
                />
                <div className="filters">
                    <div className="badge">
                        VIP
                    </div>
                </div>
            </div>
            <div className="card-body py-3">

            </div>
        </div>
    )
}

export default UserAssignGrid;