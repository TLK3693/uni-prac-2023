import {IUser} from "../IUser";
// *тип response
export interface AuthResponse {
    /*// Отправляем токеты и следом информацию о пользователе
        return {
            ...tokens,
            user: userDto
    }*/
    
    accessToken: string;
    refreshToken: string;
    user: IUser; // Это не примитивный тип данных, пожтому создаем IUser
}