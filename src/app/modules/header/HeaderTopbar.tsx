import clsx from "clsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { RootState } from "../../../setup";
import { clearSelectedCategory } from "../categories";
import PopUpController from "../controllers/PopUpController";
import { clearSelectedUser } from "../users";

const HeaderTopbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user, shallowEqual);
    const dispatch = useDispatch();

    return (
        <div className="d-flex align-items-stretch flex-shrink-0">
            <div
                className={clsx('d-flex align-items-center', 'ms-1 ms-lg-3', 'position-relative')}
            >
                <PopUpController>
                    <button className={clsx('cursor-pointer symbol', 'symbol-30px symbol-md-40px', 'topbar-menu-btn', 'position-relative')} data-popup-role='button'>
                        <img
                            src={
                                user?.profile?.getProfilePicture
                                ? user?.profile.getProfilePicture
                                : toAbsoluteUrl('/media/avatars/user_default.jpg')
                            }
                            alt='profile'
                        />
                    </button>
                    {/* <UserMenu user={user} /> */}
                    <div className='menu menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px' data-popup-role='drop' style={{backgroundColor: 'white'}}>
                        <div className='menu-item px-3'>
                            <div className='menu-content d-flex align-items-center px-3' style={{maxWidth: '100%'}}>
                                <div className='symbol symbol-50px me-5'>
                                    <img
                                        alt='Avatar'
                                        referrerPolicy="no-referrer"
                                        src={
                                        user?.profile?.getProfilePicture
                                            ? user?.profile.getProfilePicture
                                            : toAbsoluteUrl('/media/avatars/user_default.jpg')
                                        }
                                    />
                                </div>
                                <div className='d-flex flex-column' style={{maxWidth: '180px'}}>
                                    <div className='fw-bolder d-flex align-items-center fs-5'>
                                        { user ? (`${user?.firstName} ${user?.lastName}`) : 'Invited'}
                                        
                                        <span
                                            title={user?.roleDescription}
                                            className='badge badge-light-info fw-bolder text-uppercase fs-9 px-2 py-1 ms-2 text-truncate'
                                        >
                                            {user && (user?.roleDescription)}
                                        </span>
                                    </div>
                                    <a
                                        className='text-muted text-hover-primary fs-7 text-truncate d-block'
                                        style={{maxWidth: '100%'}}
                                        title={user?.email}
                                    >
                                        {user && user?.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='separator my-2'></div>
                        { !!user ? (
                            <>
                                <div className='menu-item px-5'>
                                    <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
                                        My Profile
                                    </Link>
                                </div>
                                <div className='menu-item px-5'>
                                    <Link to={'/dashboard/claims'} className='menu-link px-5' onClick={() => dispatch(clearSelectedUser())}>
                                        My Claims
                                    </Link>
                                </div>
                                <div className='menu-item px-5'>
                                    <Link to={'/assets'} className='menu-link px-5' onClick={() => dispatch(clearSelectedCategory())}>
                                        My Assets
                                    </Link>
                                </div>
                                <div className='separator my-2'></div>
                                <div className='menu-item px-5'>
                                    <Link to='/logout' className='menu-link px-5'>
                                        Sign Out
                                    </Link>
                                </div>
                            </>
                            ) : (
                            <>
                                <div className='menu-item px-5'>
                                    <Link to={'/auth/login'} className='menu-link px-5'>
                                        Log In
                                    </Link>
                                </div>
                            </>
                            )
                        }
                    </div>
                </PopUpController>
            </div>
        </div>
    );
};

export default HeaderTopbar;