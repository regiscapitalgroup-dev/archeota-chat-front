import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import AssetsPageWrapper from '../pages/assets/AssetsWrapper'
import UsersPageWrapper from '../pages/users/UsersWrapper'
import ClaimsPageWrapper from '../pages/claims/ClaimsWrapper'
export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard/:id?' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/assets/new' component={AssetsPageWrapper} />
        <Route path='/assets/edit/:id' component={AssetsPageWrapper} />
        <Route path='/assets/detail/:id' component={AssetsPageWrapper} />
        <Route exact path='/assets' component={AssetsPageWrapper} />
        <Route path='/users/new' component={UsersPageWrapper} />
        <Route path='/users/edit/:id' component={UsersPageWrapper} />
        <Route exact path='/users' component={UsersPageWrapper} />
        <Route exact path='/claims/actions' component={ClaimsPageWrapper} />
        <Route exact path='/claims/transactions' component={ClaimsPageWrapper} />
        <Route exact path='/claims/upload-transactions' component={ClaimsPageWrapper} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/apps/chat' component={ChatPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
