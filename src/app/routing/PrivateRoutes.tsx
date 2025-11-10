import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'
import { Logout } from '../modules/auth'
import AssetsPageWrapper from '../pages/assets/AssetsWrapper'
import ClaimsPageWrapper from '../pages/claims/ClaimsWrapper'
import { DashboardCoreWrapper } from '../pages/dashboardCore/DashboardCoreWrapper'
import ProfilePage from '../modules/profile/ProfilePage'
import UsersPageWrapper from '../pages/users/UsersWrapper'
import { ChatSessionsCtxProvider } from '../context/ChatSessionsContext'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../setup'

export function PrivateRoutes() {
  const user = useSelector((state: RootState) => state.auth.user, shallowEqual)
  
  return (
    <ChatSessionsCtxProvider>
      <Suspense fallback={<FallbackView />}>
        <Switch>
          <Route path='/crafted/pages/profile' component={ProfilePage} />
          <Route path='/dashboard/claims' component={DashboardCoreWrapper} />
          <Route path='/claims' component={ClaimsPageWrapper}/>
          <Route path='/assets' component={AssetsPageWrapper}/>
          { user && (user.role == 'COMPANY_ADMIN' || user.role == 'COMPANY_MANAGER') && 
            <Route path='/users' component={UsersPageWrapper}/>
          }
          <Route path='/logout' component={Logout} />
          <Redirect from='/auth' to='/assets/chat/' />
          <Redirect to='/assets/chat/'/>
        </Switch>
      </Suspense>
    </ChatSessionsCtxProvider>
  )
}
