import { useState } from "react";
import { useUnassignment } from "../../context/unassigmentContext";
import UserAssignGrid from "../molecules/UserAssignGrid";

type Props = {
    managerName: string;
    onUnassign: (clients_id: number[]) => Promise<void>;
}

const ClientsUnassigner = ({ managerName, onUnassign }: Props) => {
    const { clients, loading, sending } = useUnassignment();
    const [toUnassign, setToUnassign] = useState<number[]>([]);

    return (
        <div className="col-12 col-md-6 d-flex flex-column">
            <UserAssignGrid
                loading={loading}
                title={`Clients Assigned to ${managerName}`}
                clients={clients}
                onChangeSelected={setToUnassign}
            />

            <button disabled={toUnassign.length===0} className="mt-5 btn btn-outline-primary border border-1 border-primary" onClick={() => onUnassign(toUnassign)}>
                { sending ? (
                    <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                ) : (
                    <>
                        <i className="bi bi-arrow-left-circle-fill"></i>
                        Unassign selected
                    </>
                )}
            </button>
        </div>
    )
}

export default ClientsUnassigner;