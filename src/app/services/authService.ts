import apiClient from "../helpers/apiClient";
import { RegisterAccountModel } from "../pages/auth/models/RegisterAccountModel";

export const activateAccount = async (uidb64: string, token: string, password: string) => {
    try {
        const _result = await apiClient.post('auth/activate/', { uidb64, token, password });
        return _result;
    }
    catch (error) {
        console.error("error activate account",error);
        throw error;
    }
}

export const registerAccount = async (values: RegisterAccountModel) => {
    try {
        const _result = await apiClient.post('auth/register/', values);
        return _result;
    }
    catch (error) {
        console.error("error register account",error);
        throw error;
    }
}

export const userProfile = async () => {
    try {
        const _result = await apiClient.get('auth/user/profile/');
        return _result;
    }
    catch (error) {
        console.error("error register account",error);
        throw error;
    }
}
