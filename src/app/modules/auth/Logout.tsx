import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect, Switch} from 'react-router-dom'
import * as auth from './redux/AuthRedux'

export function Logout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(auth.actions.logout())
    document.location.reload() // <- fix the delay or show the loading screen
  }, [dispatch])

  return (
    <Switch>
      <Redirect to='/assets/chat/' />
    </Switch>
  )
}
