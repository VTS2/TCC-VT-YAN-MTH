//PetRoutes
const router = require('express').Router()
const ArmaController = require('../Controllers/ArmaController')

//helpers
const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')

//---------------- rotas privadas---------------- 
/*cadastrar uma arma*/
router.post('/create', verifyToken, imageUpload.array('image'), ArmaController.create)
/* mostrar armas do usuario logado */
router.get('/myarmas', verifyToken, ArmaController.getAllUserArmas)
/* deletar uma arma pelo id */
router.delete('/:id', verifyToken, ArmaController.removeArmaById)
/* Editar arma */
router.patch('/:id', verifyToken, imageUpload.array('image'), ArmaController.updateArma)
/** comprar arma */
router.patch('/schedule/:id', verifyToken, ArmaController.schedule)
/** concluir  compra */
router.patch('/conclude/:id', verifyToken, ArmaController.concludeAdoption)
/* armas compradas pelo user*/
router.get('/myadoptions', verifyToken, ArmaController.getAllUserPurchased)

//---------------- rotas publicas ----------------
/*listar todos as armas*/
router.get('/', ArmaController.getAll)
/*listar arma por id*/
router.get('/:id', ArmaController.getArmaById)

module.exports = router