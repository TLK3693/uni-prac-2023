const Router = require("express").Router;
const userContoller = require('../controllers/user-contoller.js')
const router = new Router();
const { body } = require('express-validator') // для валидации тела запроса
const authMiddlewares = require('../middlewares/auth-middlewares.js')

router.post('/registration', body('email').isEmail(), body('password').isLength({ min: 4, max: 30 }), userContoller.registration) //регистрация
router.post('/login', userContoller.login) // логирование
router.post('/logout', userContoller.logout) // выход из аккаунта + удаление из бд сессии (рефреш токен)
router.get('/activate/:link', userContoller.activate) // аквитация аккаунта по ссылке, которая будет приходить на почту 
router.get('/refresh', userContoller.refresh) // пеиезаписть accsess токена в случае если он умер/отправление токена и будем отбратно получить access + ref
router.get('/users', authMiddlewares, userContoller.getUsers) // вывод пользователей

module.exports = router