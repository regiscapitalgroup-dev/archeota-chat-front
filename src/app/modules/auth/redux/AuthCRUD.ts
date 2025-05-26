import axios, { AxiosError } from 'axios'
import { AuthModel } from '../models/AuthModel'
import { UserModel } from '../models/UserModel'
import apiClient from '../../../helpers/apiClient'
import { RegisterModel } from '../models/RegisterModel'

const API_URL = process.env.REACT_APP_API_URL || 'api'


// Server should return AuthModel
export async function login(email: string, password: string) {

  const response = await apiClient.post('auth/login/', { email, password })
  return response.data;
}

// Server should return AuthModel
export async function register(body: RegisterModel) {

  const { email, name, password, confirmPassword } = body;

  const response = await apiClient.post('auth/registration/', {
    username: "",
    email,
    name,
    password1: password,
    password2: confirmPassword
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

/* export async function getUserByToken(): Promise<UserModel> {

  try {
    const response = await apiClient.get<any>(`${API_URL}auth/user/`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error al obtener el usuario:', axiosError.message);
    throw axiosError;
  }
} */

export async function getUserByToken(): Promise<{ user: UserModel }> {

  return axios
    .get<any>(`${API_URL}auth/user/`)
    .then((res) => {
      return {
        user: res.data.user
      };
    })
    .catch((error) => {
      console.error("Error al obtener el usuario:", error);
      throw error;
    });
}
