import { useEffect, useState } from "react";
import { KTSVG } from "../../../../../_metronic/helpers";
import { useUserCompanies } from "../../../../hooks/company/useUserCompanies";
import { useClients } from "../../../../hooks/users/useClients";
import PopUpController from "../../../../modules/controllers/PopUpController";
import { CompanyModel } from "../../../users/models/CompanyModel";
import { UserListModel } from "../../../users/models/UserListModel";
import CompanyField from "../atoms/CompanyField";
import { UsersField } from "../atoms/UsersField";
import { CompanyOptions } from "../atoms/models/CompanyOptions";

type Props = {
    onSelectUser: (user: UserListModel | null) => void;
}

const UserSelectorTool = ({ onSelectUser }: Props) => {
    const { companies, loading: isLoadingCompany } = useUserCompanies();
    const { users, loading: isLoadingUsers, loadUsers } = useClients();
    const [ userSelected, setUserSelected ] = useState<UserListModel|null>(null)
    const [ companySelected, setCompanySelected ] = useState<CompanyModel|null>(null);

    const _handleSelectUser = (user: { value: UserListModel, label: string } | null) => {
        setUserSelected(user?.value ?? null);
    }

    const _handleSelectCompany = (company: CompanyOptions | null) => {
        setUserSelected(null);
        setCompanySelected(company ? company.value : null);
    }

    useEffect(() => {
        onSelectUser(userSelected);
    }, [userSelected]);

    useEffect(() => {
        loadUsers(companySelected ? companySelected.id : null );
    }, [companySelected]);

    return (
       <PopUpController>
            <button data-popup-role='button' className='btn btn-sm btn-flex btn-light btn-active-dark fw-bolder'>
                <KTSVG
                    path='/media/icons/duotune/communication/com005.svg'
                    className='svg-icon-5 svg-icon-gray-500 me-1'
                />
                Clients
            </button>
            <div className="col" data-popup-role='drop' >
                <div className="card shadow-md p-5 w-300px" onMouseDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()}>
                    <CompanyField
                        disabled={companies.length<=1}
                        isLoading={isLoadingCompany}
                        companies={companies}
                        companySelected={companySelected}
                        onChange={_handleSelectCompany}
                        className="mb-5"
                    />
                    <UsersField
                        isLoading={isLoadingUsers}
                        users={users}
                        userSelected={userSelected}
                        onChange={_handleSelectUser}
                        className=""
                    />
                </div>
            </div>
       </PopUpController>
    )
}

export default UserSelectorTool;