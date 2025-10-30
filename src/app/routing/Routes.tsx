/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { RootState } from '../../setup'
import { AssetDraftProvider } from '../context/AssetDraftContext'
import { ChatHistoryProvider } from '../context/ChatHistoryContext'
import { ChatsListCtxProvider } from '../context/ChatsListContext'
import { AuthPage } from '../modules/auth'
import Layout from '../pages/layout/Layout'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

const Routes: FC = () => {
  const user = useSelector<RootState>(({auth}) => auth.user, shallowEqual)
  return (
    <Switch>
      <Route path='/auth/login' component={AuthPage}/>
      <ChatsListCtxProvider>
        <ChatHistoryProvider>
          <AssetDraftProvider>
            <Layout>
              {
                user ? <PrivateRoutes/> : <PublicRoutes/>
              }
            </Layout>
          </AssetDraftProvider>
        </ChatHistoryProvider>
      </ChatsListCtxProvider>
    </Switch>
  )
}

export { Routes }

