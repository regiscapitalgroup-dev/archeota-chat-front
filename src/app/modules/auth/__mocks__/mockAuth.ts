import MockAdapter from 'axios-mock-adapter'
import { UserModel } from '../models/UserModel'
import { AuthModel } from '../models/AuthModel'

import { UsersTableMock } from './usersTableMock'

export function mockAuth(mock: MockAdapter) {
  mock.onPost('LOGIN').reply(({ data }) => {
    const { email, password } = JSON.parse(data)

    if (email && password) {
      const user = UsersTableMock.table.find(
        (x) => x.email.toLowerCase() === email.toLowerCase()
      )

      if (user) {
        const auth = user
        return [200, { ...auth, password: undefined }]
      }
    }

    return [400]
  })

  mock.onPost('REGISTER_URL').reply(({ data }) => {
    const { email, firstname, lastname, password } = JSON.parse(data)

    if (email && firstname && lastname && password) {
      const user: UserModel = {
        pk: 1,
        email,
        first_name: firstname,
        last_name: lastname,
        username: `${firstname}-${lastname}`,
        pic: process.env.PUBLIC_URL + '/media/users/default.jpg',
      }

      UsersTableMock.table.push(user)
      const auth: AuthModel = {
        accessToken: 'mock-token-' + Math.random()
      }

      return [200, { ...auth, password: undefined }]
    }

    return [400]
  })

  mock.onPost('REQUEST_PASSWORD_URL').reply(({ data }) => {
    const { email } = JSON.parse(data)

    if (email) {
      const user = UsersTableMock.table.find((x) => x.email.toLowerCase() === email.toLowerCase())
      let result = false
      if (user) {
        result = true
        return [200, { result, password: undefined }]
      }
    }

    return [400]
  })

  

  function generateUserId(): number {
    const ids = UsersTableMock.table.map((el) => el.pk)
    const maxId = Math.max(...ids)
    return maxId + 1
  }
}
