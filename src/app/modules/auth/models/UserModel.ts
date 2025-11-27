export interface UserModel {
  username: string
  email: string
  firstName: string
  lastName: string
  pk: number, 
  pic?:string,
  role?: string,
  roleDescription?: string,
  profile: {
    company: number,
    companyId: number,
    companyName: string,
    phoneNumber: number,
    getProfilePicture: string | null,
    taxId: string | null,
    nationalId: string,
    digitalSignature: any,
    classification: number | null,
    address: string,
    country: string
  };
}
