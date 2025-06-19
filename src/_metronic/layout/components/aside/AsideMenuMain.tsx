import {useChatHistory} from '../../../../app/context/ChatHistoryContext'
import {useAllHistoryChats} from '../../../../app/hooks/chat/useChats'
import {AsideMenuItem} from './AsideMenuItem'
import {useLocation, useHistory} from 'react-router-dom'
import {HistoryChatModel} from './models/HistoryChatModel'
import {useAssetDraft} from '../../../../app/context/AssetDraftContext'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'

export function AsideMenuMain() {
  const {triggerNewChat, reloadFlag} = useChatHistory()
  const location = useLocation()
  const navigate = useHistory()
  const {draft} = useAssetDraft()

  const {chats} = useAllHistoryChats(reloadFlag)

  const handleNewChat = () => {
    if (location.pathname === '/dashboard/new') {
      triggerNewChat()
    } else {
      navigate.push('/dashboard/new')
      setTimeout(() => {
        triggerNewChat()
      }, 50)
    }
  }

  return (
    <>
      <AsideMenuItem
        to='/assets'
        icon='/media/icons/duotune/art/art002.svg'
        title='Assets'
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/dashboard/new'
        icon='/media/icons/duotune/communication/com012.svg'
        title='New chat'
        fontIcon='bi-layers'
        onClick={handleNewChat}
      />

      <div className='separator my-10'></div>
      {draft && draft.category && (
        <AsideMenuItemWithSub
          to='/assets/new'
          title={`${draft.category.name || draft.category}`}
          fontIcon='bi-app-indicator'
          icon='/media/icons/duotune/art/art002.svg'
          forceOpen={true}
        >
          {draft.attributes &&
            Object.entries(draft.attributes).map(([key, value]) => (
              <AsideMenuItem key={key} to='/assets/new' title={key} hasBullet={true} />
            ))}
        </AsideMenuItemWithSub>
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
