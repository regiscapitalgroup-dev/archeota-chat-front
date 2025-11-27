import React, { lazy } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { RootState } from '../../../setup';
import { UserRoles } from '../../enums/userRoles';

const UsersPage: React.FC = () => {
  const { path } = useRouteMatch();
  const user = useSelector((state: RootState) => state.auth.user, shallowEqual);
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
      { user && (user.role === UserRoles.COMPANY_ADMIN || user.role === UserRoles.SUPER_ADMIN) &&
        <Route exact path={`${path}/assign`} component={UsersAssignment}/>
      } 
      <Redirect to='/assets/chat'/>
    </Switch>
  )
}

export { UsersPage }

