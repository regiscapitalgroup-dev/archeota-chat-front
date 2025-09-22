import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'
import * as auth from '../../app/modules/auth'
import * as selectedUser from "../../app/modules/users";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  selectedUser: selectedUser.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
