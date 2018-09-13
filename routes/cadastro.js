var express = require('express');
var router = express.Router();

var cadastroController = require('../controllers/cadastroController');
/* GET home page. */
router.get('/',cadastroController.cadastro);
router.get('/consultar',cadastroController.consultar);
router.post('/cadastrar',cadastroController.cadastrar);
router.get('/alterar',cadastroController.cadastro_update_get);

module.exports = router;