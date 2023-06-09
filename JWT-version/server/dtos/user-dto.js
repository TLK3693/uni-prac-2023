//DATA-TRANSFER-OBJECT Класс который обладает полями, которые мы будет отправлять на клиент в JWT токен 

module.exports = class UserDto { 
    email;
    id;
    isActivated; // Активирован ли аккаунт или нет

    //Конструктор котоырй принимает модель -> от туда достаем данные
    constructor(model) { 
        this.email = model.email
        this.id = model._id; // монго id c _id
        this.isActivated = model.isActivated
    }
}