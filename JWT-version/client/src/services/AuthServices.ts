import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    //С помощью статик функций будем отправлять запросы на сервер

    // Польскоку функция async -> return Promise
    // Axios всегда возвращает объект,а данные в теле ответа хранятся в поле data  и для того чтобы укзать тип этих данных, требуется тип возврата|| axios.post()-> response(object.response.data) -> store in filed 'data' 
    // Поэтому надо надо явно указать данные которые придут в ответ(object.response.data)
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        //Если бы мы не использовали AuthResponse и не расписали типы,то мы бы не смогли оьщаться к полям, к примеру response.data.email
        return $api.post<AuthResponse>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

}
