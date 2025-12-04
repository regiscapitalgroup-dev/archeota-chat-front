import { CompanyModel } from "../../../users/models/CompanyModel";
import { UserListModel } from "../../../users/models/UserListModel";

type Props = {
    companySelected: CompanyModel | null;
    userSelected: UserListModel | null;
}

const InfoFileAssigned = ({ userSelected, companySelected }: Props) => {
    const textAlert = userSelected
        ? 'Transactions to be uploaded will be assigned'
        : 'Transactions have not been assigned';
    
    return (
        <div
            className='alert alert-dismissible bg-light-dark d-flex flex-column justify-content-center align-items-center text-center p-5'
            style={{width: '100%'}}
        >
            <h5 className='mb-3'>{textAlert}</h5>
            {userSelected && (
                <>
                    { companySelected && (
                        <span className='mb-0 fw-semibold'>{companySelected.name}</span>
                    )}
                    <p className='mb-0 fw-semibold text-gray-600'>{userSelected.firstName} {userSelected.lastName}</p>
                </>
            )}
        </div>
    )
}

export default InfoFileAssigned;