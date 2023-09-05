const router = require('express').Router()
const UserController = require('../Controllers/UserController')
//helpers
// const verifyToken = require('../helpers/verify-token')
// const imageUpload = require('../helpers/image-upload')
// const photoUpload = require('../helpers/photo-upload')
// const imgFichaUpload = require('../helpers/imgFicha-upload')

//rota para criar "registrar" um usuario
//rotas publicas
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)

//rotas protegidas, só acessar caso esteja logado!!!
// router.patch('/edit/:id', verifyToken, imageUpload.single('image'), UserController.editUser)
// router.patch('/edit/:id', verifyToken, photoUpload.single('photo'), UserController.editUser)
// router.patch('/edit/:id', verifyToken, imgFichaUpload.single('imgFicha'), UserController.editUser)

module.exports = router