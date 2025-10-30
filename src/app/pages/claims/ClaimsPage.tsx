import { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const ClaimsPage = () => {
  const ClaimsAction = lazy(() => import('./features/actions/ClaimActions'));
  const ClaimsActionForm = lazy(() => import('./features/actions/ClaimActionsForm'));
  const ClaimTransactions = lazy(() => import('./features/transactions/ClaimTransactions'));
  const ClaimTransactionsForm = lazy(() => import('./features/transactions/ClaimTransactionsForm'));
  const ClaimUploadTransactions = lazy(() => import('./features/transactions/ClaimUploadTransactions'));
  const { path } = useRouteMatch();
  
  return (
    <Switch>
      <Route exact path={`${path}/actions`} component={ClaimsAction}/>
      <Route path={`${path}/actions/new`} component={ClaimsActionForm}/>
      <Route path={`${path}/actions/edit/:id`} component={ClaimsActionForm}/>
      <Route exact path={`${path}/transactions`} component={ClaimTransactions}/>
      <Route path={`${path}/transactions/new`} component={ClaimTransactionsForm}/>
      <Route path={`${path}/transactions/edit/:id`} component={ClaimTransactionsForm}/>
      <Route exact path={`${path}/upload-transactions`} component={ClaimUploadTransactions}/>
    </Switch>
  )
}

export default ClaimsPage
