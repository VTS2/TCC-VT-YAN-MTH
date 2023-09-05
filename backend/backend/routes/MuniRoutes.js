//PetRoutes
const router = require('express').Router()
const MunicaoController = require('../Controllers/MunicaoController')

//helpers
const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')

//---------------- rotas privadas---------------- 
/*cadastrar uma arma*/
router.post('/create', verifyToken, imageUpload.array('image'), MunicaoController.create)
/* mostrar armas do usuario logado */
router.get('/myarmas', verifyToken, MunicaoController.getAllUserMunicoes)
/* deletar uma arma pelo id */
router.delete('/:id', verifyToken, MunicaoController.removeMunicaoById)
/* Editar arma */
router.patch('/:id', verifyToken, imageUpload.array('image'), MunicaoController.updateMunicao)
/** comprar arma */
router.patch('/schedule/:id', verifyToken, MunicaoController.schedule)
/** concluir  compra */
router.patch('/conclude/:id', verifyToken, MunicaoController.concludeAdoption)
/* armas compradas pelo user*/
router.get('/myadoptions', verifyToken, MunicaoController.getAllUserPurchased )

//---------------- rotas publicas ----------------
/*listar todos as armas*/
router.get('/', MunicaoController.getAll)
/*listar arma por id*/
router.get('/:id', MunicaoController.getMunicaoById) 

module.exports = router