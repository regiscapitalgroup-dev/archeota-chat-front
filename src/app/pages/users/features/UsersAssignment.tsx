import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../setup";
import { UserRoles } from "../../../enums/userRoles";
import { useUserCompanies } from "../../../hooks/company/useUserCompanies";
import { useManagers } from "../../../hooks/users/useManagers";
import UserAssignmentSuperAdmin from "../components/pages/UserAssignmentSuperAdmin";
import { AssignmentCtxProvider } from "../context/assignmentContext";
import { UnassignmentCtxProvider } from "../context/unassigmentContext";
import UserAssignmentCompany from "../components/pages/UserAssignmentCompany";

const UsersAssignemt = () => {
    const { user } = useSelector((state: RootState) => state.auth, shallowEqual)
    const { managers, loadManagers, loading: loadingManagers } = useManagers();
    const { companies, loadCompanies, loading: loadingCompanies } = useUserCompanies(false);

    useEffect(() => {
        if(!user || !user.role)
            return;
        if(user.role===UserRoles.SUPER_ADMIN) {
            loadCompanies();
        }
        else {
            loadManagers(user.profile.companyId);
        }
    }, [user]);

    return (
        <UnassignmentCtxProvider>
            <AssignmentCtxProvider>
                <div className="card shadow-sm mb-10">
                    <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
                        <h3 className='card-title align-items-start flex-column'>
                            <span className='fw-bolder text-dark fs-3'>Users Assignment</span>
                            <span className='text-muted mt-1 fs-7'>List of users</span>
                        </h3>
                    </div>
                    { user?.role === UserRoles.COMPANY_ADMIN && 
                        <UserAssignmentCompany
                            managers={managers}
                            loadingManagers={loadingManagers}
                        />
                    }
                    { user?.role === UserRoles.SUPER_ADMIN &&
                        <UserAssignmentSuperAdmin
                            companies={companies}
                            loadingCompanies={loadingCompanies}
                            managers={managers}
                            loadingManagers={loadingManagers}
                            onSelectCompany={(company) => loadManagers(company.id)}
                        />
                    }
                </div>
            </AssignmentCtxProvider>
        </UnassignmentCtxProvider>

    )
};

export default UsersAssignemt;