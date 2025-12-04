import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../../setup";
import { Modules } from "../../../../constants/modules";
import { UserRoles } from "../../../../enums/userRoles";
import { canAccessModule } from "../../../../helpers/permissions";
import { useUserCompanies } from "../../../../hooks/company/useUserCompanies";
import { useClients } from "../../../../hooks/users/useClients";
import { CompanyModel } from "../../../users/models/CompanyModel";
import { UserListModel } from "../../../users/models/UserListModel";
import UploadClaimsTransactionsFile from "../../components/UploadClaimsTransactionsFile";
import { CompanyOptions } from "../../components/atoms/models/CompanyOptions";
import UserSelectorStaff from "../../components/molecules/UserSelectorStaff";

const ClaimUploadTransactions: React.FC = () => {
    const {user} = useSelector((root: RootState) => root.auth, shallowEqual);
    const userSession = useSelector((state: RootState) => state.auth.user, shallowEqual);
    const [ userSelected, setUserSelected ] = useState<UserListModel|null>(null)
    const [ companySelected, setCompanySelected ] = useState<CompanyModel|null>(null);
    const { companies, loading: isLoadingCompany } = useUserCompanies();
    const { users, loading: isLoadingUsers, loadUsers } = useClients();

    const _handleSelectUser = (user: { value: UserListModel, label: string } | null) => {
        setUserSelected(user?.value ?? null)
    }

    const _handleSelectCompany = (company: CompanyOptions | null) => {
        setUserSelected(null);
        setCompanySelected(company ? company.value : null);
    }
  
    const _reloadTransactions = () => {
        setUserSelected(null);
        setCompanySelected(null);
    }

    useEffect(() => {
        if(companies.length === 1)
            setCompanySelected(companies[0]);
    }, [companies]);

    useEffect(() => {
        if(!!user && user?.role !== UserRoles.CLIENT && user?.role !== UserRoles.FINAL_USER)
                    loadUsers(companySelected ? companySelected.id : null );
    }, [companySelected]);

    return (
        <div className='card shadow-sm mb-10'>
            <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='fw-bolder text-dark fs-3'>Upload Transactions</span>
                </h3>
            </div>
            <div className='card-body'>
                {canAccessModule(Modules.USERS, userSession?.role || '') && (
                        <UserSelectorStaff
                            isLoadingCompany={isLoadingCompany}
                            companies={companies}
                            companySelected={companySelected}
                            onChangeCompany={_handleSelectCompany}
                            isLoadingUsers={isLoadingUsers}
                            userSelected={userSelected}
                            users={users}
                            onChangeUser={_handleSelectUser}
                        />
                )}
                <div className='row'>
                <div className='col-md-12'>
                    <UploadClaimsTransactionsFile
                        onUploadSuccess={_reloadTransactions}
                        user={userSelected}
                    />
                </div>
                </div>
            </div>
        </div>
    );
};

export default ClaimUploadTransactions;