import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import * as auth from '../../app/modules/auth'
import * as selectedUser from "../../app/modules/users";
import * as selectedCategory from "../../app/modules/categories";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  selectedUser: selectedUser.reducer,
  selectedCategory: selectedCategory.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
