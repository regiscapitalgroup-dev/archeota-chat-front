import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Chat from '../chat/features/chat/Chat';
import AssetsForm from './components/AssetsForm';

const AssetsPage: React.FC = () => {
  const { path } = useRouteMatch();
  const Assets = lazy(() => import('./features/assets/Assets'));
  const AssetsForms = lazy(() => import('./features/assets/AssetsForms'));
  const AssetsDetails = lazy(() => import('./features/assets/AssetsDetails'));
  
  return (
    <Switch>
      <Route exact path={`${path}`} component={Assets}/>
      <Route path={`${path}/new`} component={AssetsForm}/>
      <Route path={`${path}/edit/:id`} component={AssetsForms}/>
      <Route path={`${path}/detail/:id`} component={AssetsDetails}/>
      <Route path={`/assets/chat/:id?`} component={Chat}/>
    </Switch>
  );
}

export { AssetsPage };

