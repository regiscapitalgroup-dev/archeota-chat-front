import React, { lazy } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import AssetsForm from './components/AssetsForm'

const AssetsPage: React.FC = () => {
  const { path } = useRouteMatch();
  const Assets = lazy(() => import('./features/assets/Assets'));
  const AssetsForms = lazy(() => import('./features/assets/AssetsForms'));
  const AssetsDetails = lazy(() => import('./features/assets/AssetsDetails'));
  const Chat = lazy(() => import('./features/chat/Chat'));

  return (
    <Switch>
      <Route exact path={`${path}`} component={Assets}/>
      <Route path={`${path}/new`} component={AssetsForm}/>
      <Route path={`${path}/edit/:id`} component={AssetsForms}/>
      <Route path={`${path}/detail/:id`} component={AssetsDetails}/>
      <Route path={`${path}/chat/:id?`} component={Chat}/>
      <Redirect to='/error/404' />
    </Switch>
  );
}

export { AssetsPage }

