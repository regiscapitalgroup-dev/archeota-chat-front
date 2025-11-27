import { useState } from "react";
import Select from "react-select";
import { useAssignment } from "../../context/assignmentContext";
import { useUnassignment } from "../../context/unassigmentContext";
import { AccountManagerModel } from "../../models/AccountManagerModel";
import UserAssignmentGrid from "../templates/UserAssignmentGrid";

type Props = {
    managers: AccountManagerModel[];
    loadingManagers: boolean;
}

const UserAssignmentCompany = ({ loadingManagers: loading, managers }: Props) => {
    const [managerSelected, setManagerSelected] = useState<AccountManagerModel|null>(null);
    const { loadClients: loadAvailable, Assign } = useAssignment();
    const { loadClients: loadAssigned, Unassign } = useUnassignment();

    const _handleUserSelect = async (e: { value: AccountManagerModel, label: string }) => {
        setManagerSelected(e.value);
        await Promise.all([
            loadAvailable(e.value.id),
            loadAssigned(e.value.id)
        ]);
    }
    
    const _handleAssign = async (clients: number[]) => {
        if(!managerSelected)
            return;

        await Promise.all(clients.map(c => Assign(c, managerSelected.id)));
        await Promise.all([
            loadAvailable(managerSelected.id),
            loadAssigned(managerSelected.id)
        ]);   
    }

    const _handleUnassign = async (clients: number[]) => {
        if(!managerSelected)
            return;
        await Promise.all(clients.map(c => Unassign(c)));
        await Promise.all([
            loadAvailable(managerSelected.id),
            loadAssigned(managerSelected.id)
        ]);
    }

    return (
        <div className="card-body py-3 d-flex flex-column gap-2 align-items-center">
            <div className="row mb-5 w-100" style={{ maxWidth: '50rem' }}>
                <div className="col">
                    <span className="fs-4 fw-bolder">Account manager</span>
                    <Select
                        isLoading={loading}
                        placeholder='Select an account manager'
                        options={managers.map(u => ({ value: u, label: `${u.firstName} ${u.lastName}`}))}
                        onChange={_handleUserSelect}
                    />
                </div>
            </div>
            { managerSelected && (
                <UserAssignmentGrid
                    managerName={`${managerSelected.firstName} ${managerSelected.lastName}`}
                    onAssign={_handleAssign}
                    onUnassign={_handleUnassign}
                />
            )}
        </div>
    )
}

export default UserAssignmentCompany;