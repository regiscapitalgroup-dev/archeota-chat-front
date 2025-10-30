import { Redirect, Route, Switch } from 'react-router-dom'
import Chat from '../pages/chat/features/chat/Chat'

export function PublicRoutes() {
  return (
      <Switch>
        <Route exact path='/assets/chat/:id?' component={Chat}/>
        <Route path='*'>
          <Redirect to='/assets/chat/'/>
        </Route>
      </Switch>
  )
}
