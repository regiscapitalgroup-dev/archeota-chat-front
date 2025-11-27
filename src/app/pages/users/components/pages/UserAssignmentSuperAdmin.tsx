import { useState } from "react";
import Select from "react-select";
import { useAssignment } from "../../context/assignmentContext";
import { useUnassignment } from "../../context/unassigmentContext";
import { AccountManagerModel } from "../../models/AccountManagerModel";
import { CompanyModel } from "../../models/CompanyModel";
import UserAssignmentGrid from "../templates/UserAssignmentGrid";

type Props = {
    companies: CompanyModel[];
    loadingCompanies: boolean;
    managers: AccountManagerModel[];
    loadingManagers: boolean;
    onSelectCompany: (company: CompanyModel) => Promise<void>;
}

const UserAssignmentSuperAdmin = ({ 
    companies,
    loadingCompanies,
    managers,
    loadingManagers,
    onSelectCompany
}: Props) => {
    const [managerSelected, setManagerSelected] = useState<AccountManagerModel|null>(null);
    const { loadClients: loadAvailable, Assign } = useAssignment();
    const { loadClients: loadAssigned, Unassign } = useUnassignment();

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

    const _handleSelectCompany = (company: { value: CompanyModel, label: string }) => {
        setManagerSelected(null);
        onSelectCompany(company.value);
    }

    const _handleManagerSelect = async (e: { value: AccountManagerModel, label: string }) => {
        setManagerSelected(e.value);
        await Promise.all([
            loadAvailable(e.value.id),
            loadAssigned(e.value.id)
        ]);
    }
    
    return (
        <div className="card-body py-3 d-flex flex-column gap-2 align-items-center">
            <div className="row mb-5 w-100" style={{ maxWidth: '50rem' }}>
                <div className="col-12 col-md-6">
                    <span className="fs-4 fw-bolder">Company</span>
                    <Select
                        placeholder='Select a company'
                        classNamePrefix="react-select"
                        isLoading={loadingCompanies}
                        options={companies.map(u => ({ value: u, label: u.name}))}
                        onChange={_handleSelectCompany}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <span className="fs-4 fw-bolder">Account manager</span>
                    <Select
                        disabled={managers.length===0}
                        placeholder='Select a manager'
                        classNamePrefix="react-select"
                        isLoading={loadingManagers}
                        options={managers.map(u => ({ value: u, label: `${u.firstName} ${u.lastName}`}))}
                        onChange={_handleManagerSelect}
                        value={managerSelected ? { value: managerSelected, label: `${managerSelected.firstName} ${managerSelected.lastName}` } :null}
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

export default UserAssignmentSuperAdmin;