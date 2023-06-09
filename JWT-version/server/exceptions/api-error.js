module.exports = class ApiError extends Error {
    status;  // 400, 404,500,200 ...
    errors;

    constructor(status, message, errors = []) {
        super(message); // Ключевое слово super используется для вызова функций, принадлежащих родителю объекта.
        this.status = status;
        this.errors = errors;
    }
    // Кста, статик функции можно использовать не создавая экземляр класса
    
    // Возвращаем экземпляр текущего класса / 401 - пользователья не авторизова
    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    // Пользователь ввел неправильные данные, не прошел валидацию и тд.
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    
}