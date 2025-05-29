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

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>('REQUEST_PASSWORD_URL', { email })
}

export async function getUserByToken() {
  const res = apiClient.get<UserModel>('auth/user/')
  return (await res).data
}


// Envías directamente el id_token a tu backend
export async function registerGoogleV2(idToken: string) {
  const response = await apiClient.post('auth/google-login/', {
    id_token: idToken,
  });
  return response.data;
}
