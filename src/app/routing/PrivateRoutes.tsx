import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'
import { Logout } from '../modules/auth'
import AssetsPageWrapper from '../pages/assets/AssetsWrapper'
import ClaimsPageWrapper from '../pages/claims/ClaimsWrapper'
import { DashboardCoreWrapper } from '../pages/dashboardCore/DashboardCoreWrapper'
import ProfilePage from '../modules/profile/ProfilePage'

export function PrivateRoutes() {
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/dashboard/claims' component={DashboardCoreWrapper} />
        <Route path='/claims' component={ClaimsPageWrapper}/>
        <Route path='/assets' component={AssetsPageWrapper}/>
        <Route path='/logout' component={Logout} />
        <Redirect from='/auth' to='/assets/chat/' />
        <Redirect to='/assets/chat/'/>
      </Switch>
    </Suspense>
  )
}
