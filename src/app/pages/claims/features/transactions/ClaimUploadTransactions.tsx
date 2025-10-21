import { shallowEqual, useSelector } from "react-redux";
import { Modules } from "../../../../constants/modules";
import { canAccessModule } from "../../../../helpers/permissions";
import { RootState } from "../../../../../setup";
import { UsersAutocompleteField } from "../../components/UsersField";
import UploadClaimsTransactionsFile from "../../components/UploadClaimsTransactionsFile";
import { useUsers } from "../../../../hooks/users/useUsers";
import { useState } from "react";

const ClaimUploadTransactions: React.FC = () => {
    const userSession = useSelector((state: RootState) => state.auth.user, shallowEqual);
    const [user, setUser] = useState<any | null>()
    const [reload, setReload] = useState<number>(Math.random() * 50)
    const [reloadUser] = useState<number>(Math.random() * 50);
    const {users, loading: loadingAllUsers, error: ErrorList} = useUsers(reloadUser);
    const selectUserAsignement = (user: any | null) => {
        setUser(user)
    }

    const reloadTransactions = (newValue: number) => {
        setReload(newValue * 100)
        setUser(null)
    }

    const textAlert = user
        ? 'Transactions to be uploaded will be assigned'
        : 'Transactions have not been assigned'

    return (
        <div className='card shadow-sm mb-10'>
            <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='fw-bolder text-dark fs-3'>Upload Transactions</span>
                </h3>
            </div>
            <div className='card-body'>
                {canAccessModule(Modules.USERS, userSession?.role || '') && (
                <div className='row'>
                    <div className='col-md-6'>
                    <UsersAutocompleteField
                        users={users}
                        loading={loadingAllUsers}
                        onUserSelected={selectUserAsignement}
                        uploadSucces={reload}
                    />
                    </div>
                    <div className='col-md-6 d-flex justify-content-center'>
                    <div
                        className='alert alert-dismissible bg-light-dark d-flex flex-column justify-content-center align-items-center text-center p-5'
                        style={{width: '100%'}}
                    >
                        <h5 className='mb-3'>{textAlert}</h5>
                        {user?.label && (
                        <p className='mb-0 fw-semibold text-gray-600'>{user.label}</p>
                        )}
                    </div>
                    </div>
                </div>
                )}

                <div className='row'>
                <div className='col-md-12'>
                    <UploadClaimsTransactionsFile
                    onUploadSuccess={reloadTransactions}
                    user={user}
                    />
                </div>
                </div>
            </div>
        </div>
    );
};

export default ClaimUploadTransactions;