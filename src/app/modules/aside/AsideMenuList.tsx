import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { HistoryChatModel } from "../../../_metronic/layout/components/aside/models/HistoryChatModel";
import { RootState } from "../../../setup";
import { useAssetDraft } from "../../context/AssetDraftContext";
import { useChatsList } from "../../context/ChatsListContext";
import { useCategories } from "../../hooks/categories/useCategories";
import { clearSelectedCategory, setSelectedCategory } from "../categories";
import AsideMenuElement from "./AsideMenuElement";
import ListMenuElement from "./ListMenuElement";

export const AsideMenuList: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const {draft, setDraft} = useAssetDraft();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user, shallowEqual);
    const {categories} = useCategories(user);
    const isClaims = location.pathname.startsWith('/claims') || location.pathname.startsWith('/dashboard');
    const isAssets = location.pathname.startsWith('/assets') || location.pathname.includes('/profile');
    const { chats, triggerClear, loadChats } = useChatsList();

    const handleNewChat = () => {
        const _empty = async () => {
            if(await triggerClear()) {
                history.push('/assets/chat/');
                setDraft(null);
            }
        }
        _empty();
    }

    const handleLogin = () => {
        const _empty = async () => {
            if(await triggerClear())
                history.push('/auth/login/');
        }
        _empty();
    }

    useEffect(() => {
        if(!user)
            return;
        loadChats();
    }, [user]);

    return(
        <>
        { !user && (
            <>
                <div className="menu-item">
                    <div className="menu-content pt-8 pb-2">
                        <span className="menu-section text-muted text-uppercase fs-8 ls-1">Profile</span>
                    </div>
                </div>
                <AsideMenuElement 
                    to=''
                    icon='/media/icons/duotune/communication/com006.svg'
                    title='Login'
                    fontIcon='bi-layers'
                    onClick={handleLogin}
                />
            </>
        )}

        { user && isClaims && (
            <>
                <div className="menu-item">
                    <div className="menu-content pt-8 pb-2">
                        <span className="menu-section text-muted text-uppercase fs-8 ls-1">Dashboard</span>
                    </div>
                </div>
                <AsideMenuElement 
                    to='/dashboard/claims'
                    icon='/media/icons/duotune/general/gen011.svg'
                    title='Dashboard'
                    fontIcon='bi-layers'
                />

                <div className='menu-item'>
                    <div className='menu-content pt-8 pb-2'>
                    <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Claims</span>
                    </div>
                </div>

                <AsideMenuElement
                    to='/claims/actions'
                    icon='/media/icons/duotune/general/gen048.svg'
                    title='Actions'
                    fontIcon='bi-layers'
                />
                <AsideMenuElement
                    to='/claims/transactions'
                    icon='/media/icons/duotune/general/gen022.svg'
                    title='Transactions'
                    fontIcon='bi-layers'
                />
                <div className='separator my-5'></div>
            </>
        )}

        { user && isAssets && (
            <>
                <div className='menu-item'>
                    <div className='menu-content pt-8 pb-2'>
                        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Assets</span>
                    </div>
                </div>
                <AsideMenuElement
                    to='/assets'
                    strict={true}
                    icon='/media/icons/duotune/art/art002.svg'
                    title='Portfolio'
                    fontIcon='bi-app-indicator'
                    onClick={() => {
                        dispatch(clearSelectedCategory());
                         history.push(`/assets`)
                    }}
                />
                <ListMenuElement
                    title='Categories'
                    fontIcon='bi-people'
                    icon='/media/icons/duotune/general/gen049.svg'
                >
                    {categories &&
                        categories.map((cat: any) => (
                            <AsideMenuElement
                                key={cat.id}
                                to={''}
                                title={cat?.categoryName}
                                hasBullet={true}
                                onClick={() => { 
                                    dispatch(
                                        setSelectedCategory({
                                        id: cat.id,
                                        name: cat.categoryName,
                                        })
                                    )
                                    history.push(`/assets`)
                                }}
                            />
                    ))}
                </ListMenuElement>
                <div className='separator my-5'></div>
            </>
        )}
        
        { user && isAssets && draft && draft.category && (
            <>
                <ListMenuElement
                    title={`${draft.category.name || draft.category}`}
                    fontIcon='bi-app-indicator'
                    icon='/media/icons/duotune/art/art002.svg'
                    forceOpen={true}
                >
                    <div className='mb-5'>
                    {draft.attributes &&
                        Object.entries(draft.attributes).map(([key, value]) => (
                        <AsideMenuElement
                            key={key}
                            to='/assets/new'
                            title={`${key}: ${value}`}
                            hasBullet={true}
                        />
                        ))}
                    </div>
                    <button className='badge badge-white w-100 pt-3 pb-3 text-center' onClick={() => history.push('/assets/new')}>
                        New asset
                    </button>
                </ListMenuElement>
            </>
        )}

        <div>
            {isAssets && (
                <>
                    <div className='menu-item'>
                        <div className='menu-content pt-8 pb-2'>
                        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Chats</span>
                        </div>
                    </div>
                    <AsideMenuElement
                        to='/assets/chat/'
                        strict={true}
                        icon='/media/icons/duotune/communication/com012.svg'
                        title='New Chat'
                        fontIcon='bi-layers'
                        onClick={handleNewChat}
                    />
                </>
            )}
            { isAssets && chats.length > 0 && (
                <>
                    {chats.map((item: HistoryChatModel) => (
                        <AsideMenuElement
                            key={item.sessionId}
                            to={`/assets/chat/${item.sessionId}`}
                            icon='/media/icons/duotune/communication/com009.svg'
                            title={item.title}
                            fontIcon='bi-layers'
                            onClick={() => history.push(`/assets/chat/${item.sessionId}`)}
                        />
                    ))}
                </>
            )}
        </div>
        </>
    );
};

export default AsideMenuList;