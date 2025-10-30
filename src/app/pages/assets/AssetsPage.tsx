import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AssetsForm from './components/AssetsForm';
import ChatBot from '../chat/components/ChatBot';
import Chat from '../chat/features/chat/Chat';

const AssetsPage: React.FC = () => {
  const { path } = useRouteMatch();
  const Assets = lazy(() => import('./features/assets/Assets'));
  const AssetsForms = lazy(() => import('./features/assets/AssetsForms'));
  const AssetsDetails = lazy(() => import('./features/assets/AssetsDetails'));
  // const ChatBot = lazy(() => import('../chat/features/chat/Chat'));
  
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

