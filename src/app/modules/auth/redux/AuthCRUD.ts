import axios from 'axios'
import { UserModel } from '../models/UserModel'
import apiClient from '../../../helpers/apiClient'
import { RegisterModel } from '../models/RegisterModel'

// Server should return AuthModel
export async function login(email: string, password: string) {

  const response = await apiClient.post('auth/login/', { email, password })
  return response.data;
}

// Server should return AuthModel
export async function register(body: RegisterModel) {

  const { email, firstName, lastName, password } = body;

  const response = await apiClient.post('auth/register/', {
    firstName,
    lastName,
    email,
    password,
  });
  return response;
}

export async function registerGoogle(data: any) {
  const res = await apiClient.post('auth/google/', data);
  return res;
}

export async function getUserByToken() {
  const res = apiClient.get<UserModel>('auth/user/')
  return (await res).data
}

export async function registerGoogleV2(idToken: string) {
  const response = await apiClient.post('auth/google-login/', {
    id_token: idToken,
  });
  return response.data;
}

export async function requestPassword(email: string) {
  return await apiClient.post('auth/password-reset/', { email })
}

export async function recoverAccount(token: string, new_password: string, user: string) {
  const response = await apiClient.post(
    `auth/reset-password/confirm/`,
    { password: new_password, user: user, token: token }
  )
  return response.data
}