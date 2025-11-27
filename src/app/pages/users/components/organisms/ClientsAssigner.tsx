import { useState } from "react";
import { useAssignment } from "../../context/assignmentContext";
import UserAssignGrid from "../molecules/UserAssignGrid";

type Props = {
    onAssign: (clients_id: number[]) => Promise<void>;
}

const ClientsAssigner = ({ onAssign }: Props) => {
    const { loading, clients, sending } = useAssignment();
    const [toAssign, setToAssign] = useState<number[]>([]);

    return (
        <div className="col-12 col-md-6 d-flex flex-column">
            <UserAssignGrid
                loading={loading}
                title="Available Clients"
                clients={clients}
                onChangeSelected={setToAssign}
            />
            
            <button disabled={toAssign.length===0} className="mt-5 btn btn-primary" onClick={() => onAssign(toAssign)}>
                { sending ? (
                    <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                ) : (
                    <>
                        <i className="bi bi-arrow-right-circle-fill"></i>
                        Assign selected
                    </>
                )}
            </button>
        </div>
    )
}

export default ClientsAssigner;