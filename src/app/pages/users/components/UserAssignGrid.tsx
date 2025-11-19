import Select from "react-select";
import { _UserListMock } from "../mock/user_list.mock";
import { FC } from "react";



type Props = {
    clients: any[]
}

const UserAssignGrid: FC<Props> = ({ clients }: Props) => {
    return (
        <div className="card shadow-sm mb-10">
            <div className="card-header border-0 pt-5 d-flex flex-column">
                <h3 className="card-title">
                    <span className="fw-bolder text-dark fs-4">
                        Clientes disponibles
                    </span>
                </h3>
                <div className="input-group mb-3">
                    <span className="input-group-text"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control" placeholder="Search an user" />
                </div>
                <div className="filters">
                    <div className="badge classifier classifier-1">
                        VIP
                    </div>
                    <div className="badge classifier classifier-2">
                        VIP
                    </div>
                    <div className="badge classifier classifier-3">
                        VIP
                    </div>
                </div>
            </div>
            <div className="card-body py-3 d-inline-flex flex-column gap-3">
                { clients.map(c => (
                    <label className="card shadow-sm cursor-pointer">
                        <div className="card-body d-flex flex-row">
                            <span> { c.firstName } </span>
                            <div className="form-check ms-auto">
                                <input type="checkbox" className="form-check-input" />
                            </div>
                        </div>
                    </label>
                ))}


            </div>
        </div>
    )
}

export default UserAssignGrid;