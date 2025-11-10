import UserAssignGrid from "../components/UserAssignGrid";

const UsersAssignemt = () => {
    return (
        <div className="card shadow-sm  mb-10">
            <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
                <h3 className='card-title align-items-start flex-column'>
                    <span className='fw-bolder text-dark fs-3'>Users Assignment</span>
                    <span className='text-muted mt-1 fs-7'>List of users</span>
                </h3>
            </div>
            <div className="card-body py-3">
                <UserAssignGrid />
            </div>
        </div>
    )
};

export default UsersAssignemt;