import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {UserModel} from '../models/UserModel'

export class UsersTableMock {
  public static table: Array<UserModel> = [
    {
      pk: 1,
      username: 'admin',
      email: 'admin@demo.com',
      pic: toAbsoluteUrl('/media/avatars/150-2.jpg'),
      first_name: 'Sean',
      last_name: 'Stark',
      
      }
    
  ]
}
