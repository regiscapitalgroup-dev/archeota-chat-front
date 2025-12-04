import { CompanyModel } from "../../../users/models/CompanyModel";
import { UserListModel } from "../../../users/models/UserListModel";
import CompanyField from "../atoms/CompanyField";
import InfoFileAssigned from "../atoms/InfoFileAssigned";
import { CompanyOptions } from "../atoms/models/CompanyOptions";
import { UsersField } from "../atoms/UsersField";

type Props = {
    isLoadingCompany: boolean;
    companies: CompanyModel[];
    companySelected: CompanyModel | null;
    onChangeCompany: (value: CompanyOptions | null) => void;
    isLoadingUsers: boolean;
    users: UserListModel[];
    userSelected: UserListModel | null;
    onChangeUser: (value: { value: UserListModel, label: string } | null) => void;
}

export const UserSelectorStaff = ({ 
    isLoadingCompany,
    companies,
    companySelected,
    onChangeCompany,
    isLoadingUsers,
    users,
    userSelected,
    onChangeUser
}: Props ) => {
    return (
        <div className="row">
            <div className="col-md-6">
                <CompanyField
                    disabled={companies.length<=1}
                    isLoading={isLoadingCompany}
                    companies={companies}
                    companySelected={companySelected}
                    onChange={onChangeCompany}
                />
                <UsersField
                    isLoading={isLoadingUsers}
                    users={users}
                    userSelected={userSelected}
                    onChange={onChangeUser}
                    className="mb-5 py-5"
                />
            </div>
            <div className='col-md-6 d-flex justify-content-center'>
                <InfoFileAssigned 
                    userSelected={userSelected}
                    companySelected={companySelected}
                />
            </div>
        </div>
    )
}

export default UserSelectorStaff;