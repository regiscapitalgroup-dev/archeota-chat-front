export interface UserModel {
  username: string
  email: string
  firstName: string
  lastName: string
  pk: number, 
  pic?:string,
  role?: string,
  roleDescription?: string,
  profile: any
}
