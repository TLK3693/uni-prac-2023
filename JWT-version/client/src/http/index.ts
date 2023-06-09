import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {store} from "../index";
import {IUser} from "../models/IUser";

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,// чтобы куки цеплялись к пользователю автоматически
    baseURL: API_URL
})

// ПЕРЕХВАТЧИК НА ЗАПРОСЫ -> на каждый запрос теперь цепляется токен пользователя
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})


// Перехватчик на запросы -> если пользователь нажимает на "получить пользователей" и у него истек время жизни token, то мы обновляем его и делам снова такой же запрос
$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Авторизируйтесь')
        }
    }
    throw error;
})

export default $api;