import {useChatHistory} from '../../../../app/context/ChatHistoryContext'
import {useAllHistoryChats} from '../../../../app/hooks/chat/useChats'
import {AsideMenuItem} from './AsideMenuItem'
import {useLocation, useHistory} from 'react-router-dom'
import {HistoryChatModel} from './models/HistoryChatModel'
import {useAssetDraft} from '../../../../app/context/AssetDraftContext'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../../setup/redux/RootReducer'
import {canAccessModule} from '../../../../app/helpers/permissions'
import {Modules} from '../../../../app/constants/modules'
import {useDispatch} from 'react-redux'
import {setSelectedUser} from '../../../../app/modules/users/SelectedUser'
import {useState} from 'react'
import {useUsers} from '../../../../app/hooks/users/useUsers'
import {useCategories} from '../../../../app/hooks/categories/useCategories'
import {clearSelectedCategory, setSelectedCategory} from '../../../../app/modules/categories'

export function AsideMenuMain() {
  const {triggerNewChat, reloadFlag} = useChatHistory()
  const location = useLocation()
  const navigate = useHistory()
  const {draft, setDraft} = useAssetDraft()
  const user = useSelector((state: RootState) => state.auth.user, shallowEqual)
  const {chats} = useAllHistoryChats(reloadFlag)
  const dispatch = useDispatch()
  const [realod, setRealod] = useState<number>(Math.random() * 20)
  const {users, loading: loadingAllUsers, error: ErrorList} = useUsers(realod)
  const {categories} = useCategories()

  const handleNewChat = () => {
    if (location.pathname === '/dashboard/new') {
      triggerNewChat()
      setDraft(null)
    } else {
      navigate.push('/dashboard/new')
      setTimeout(() => {
        triggerNewChat()
        setDraft(null)
      }, 50)
    }
  }

  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Dashboard</span>
        </div>
      </div>

      <AsideMenuItem
        to='/dashboard/claims'
        icon='/media/icons/duotune/general/gen011.svg'
        title='Dashboard'
        fontIcon='bi-layers'
      />

      {canAccessModule(Modules.USERS, user?.role || '') && (
        <>
          <div className='menu-item'>
            <div className='menu-content pt-8 pb-2'>
              <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
                User Management
              </span>
            </div>
          </div>

          <AsideMenuItem
            to='/users'
            title='Users'
            fontIcon='bi-people'
            icon='/media/icons/duotune/general/gen049.svg'
          />
          <AsideMenuItemWithSub
            to=''
            title='Assigned users'
            fontIcon='bi-people'
            icon='/media/icons/duotune/general/gen049.svg'
          >
            {users &&
              users.map((user: any) => (
                <AsideMenuItem
                  key={user.id}
                  to={`/claims/actions/${user?.firstName}`}
                  title={user?.firstName}
                  hasBullet={true}
                  onClick={() => {
                    dispatch(
                      setSelectedUser({
                        id: user.id,
                        name: user.firstName,
                      })
                    )
                    navigate.push(`/claims/actions/${user?.firstName}`)
                  }}
                />
              ))}
          </AsideMenuItemWithSub>
        </>
      )}

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Claims</span>
        </div>
      </div>

      <AsideMenuItem
        to='/claims/actions'
        icon='/media/icons/duotune/general/gen048.svg'
        title='Actions'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/claims/transactions/'
        icon='/media/icons/duotune/general/gen022.svg'
        title='Transactions'
        fontIcon='bi-layers'
      />
      <div className='separator my-5'></div>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Assets</span>
        </div>
      </div>
      <AsideMenuItem
        to='/assets'
        icon='/media/icons/duotune/art/art002.svg'
        title='Portfolio'
        fontIcon='bi-app-indicator'
        onClick={() => dispatch(clearSelectedCategory())}
      />
      <AsideMenuItemWithSub
        to=''
        title='Categories'
        fontIcon='bi-people'
        icon='/media/icons/duotune/general/gen049.svg'
      >
        {categories &&
          categories.map((cat: any) => (
            <AsideMenuItem
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
                navigate.push(`/assets`)
              }}
            />
          ))}
      </AsideMenuItemWithSub>
      <AsideMenuItem
        to='/dashboard/new'
        icon='/media/icons/duotune/communication/com012.svg'
        title='New chat'
        fontIcon='bi-layers'
        onClick={handleNewChat}
      />
      <div className='separator my-5'></div>

      {draft && draft.category && (
        <>
          <AsideMenuItemWithSub
            to='/assets/new'
            title={`${draft.category.name || draft.category}`}
            fontIcon='bi-app-indicator'
            icon='/media/icons/duotune/art/art002.svg'
            forceOpen={true}
          >
            <div className='mb-5'>
              {draft.attributes &&
                Object.entries(draft.attributes).map(([key, value]) => (
                  <AsideMenuItem
                    key={key}
                    to='/assets/new'
                    title={`${key}: ${value}`}
                    hasBullet={true}
                  />
                ))}
            </div>

            <AsideMenuItem to='/assets/new' title='New asset' className='badge badge-white' />
          </AsideMenuItemWithSub>
        </>
      )}

      <div className='separator my-15'>
        {chats.length > 0 && (
          <>
            <div className='menu-item'>
              <div className='menu-content pt-8 pb-2'>
                <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Chats</span>
              </div>
            </div>
            {chats.map((item: HistoryChatModel) => (
              <AsideMenuItem
                key={item.sessionId}
                to={`/dashboard/${item.sessionId}`}
                icon='/media/icons/duotune/communication/com009.svg'
                title={item.title}
                fontIcon='bi-layers'
                onClick={() => navigate.push(`/dashboard/${item.sessionId}`)}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}
