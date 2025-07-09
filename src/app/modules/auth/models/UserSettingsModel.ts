export interface IUpdatePassword {
    newPassword: string
    passwordConfirmation: string
}

export const updatePassword: IUpdatePassword = {
    newPassword: '',
    passwordConfirmation: '',
}