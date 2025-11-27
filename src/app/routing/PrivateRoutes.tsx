import { Suspense } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'
import { RootState } from '../../setup'
import { ChatSessionsCtxProvider } from '../context/ChatSessionsContext'
import { Logout } from '../modules/auth'
import ProfilePage from '../modules/profile/ProfilePage'
import AssetsPageWrapper from '../pages/assets/AssetsWrapper'
import ClaimsPageWrapper from '../pages/claims/ClaimsWrapper'
import { DashboardCoreWrapper } from '../pages/dashboardCore/DashboardCoreWrapper'
import UsersPageWrapper from '../pages/users/UsersWrapper'
import { UserRoles } from '../enums/userRoles'

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
          { user && (user.role === UserRoles.SUPER_ADMIN || user.role === UserRoles.COMPANY_ADMIN || user.role === UserRoles.COMPANY_MANAGER) && 
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
