import React, { lazy } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

const UsersPage: React.FC = () => {
  const { path } = useRouteMatch();
  const UsersList = lazy(() => import('./features/UsersList'));
  const UsersForm = lazy(() => import('./features/UsersForm'));
  const UsersDetails = lazy(() => import('./features/UsersDetails'));
  const UsersAssignment = lazy(() => import('./features/UsersAssignment'));
  return (
    <Switch>
      <Route exact path={`${path}`} component={UsersList}/>
      <Route exact path={`${path}/edit/:id`} component={UsersForm}/>
      <Route exact path={`${path}/details/:id`} component={UsersDetails}/>
      <Route exact path={`${path}/new`} component={UsersForm}/>
      <Route exact path={`${path}/assign`} component={UsersAssignment}/>
      <Redirect to='/assets/chat'/>
    </Switch>
  )
}

export { UsersPage }

