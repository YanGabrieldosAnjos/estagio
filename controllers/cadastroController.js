var Cadastro = require('../models/cadastro');
function handleError(error) {
    console.error(`Error ${error}\n${error.stack}`);
    process.exit(2);
  }
exports.cadastro =function(req,res){
    res.render('cadastro', {validacao: {}, dadosForm: {}});
};
exports.cadastrar= function(req,res){
    var dadosForm = req.body;
    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
	req.assert('cpf', 'CPF não pode ser vazio').notEmpty();
	req.assert('email', 'Email não pode ser vazio').notEmpty();
	req.assert('telefone', 'Telefone não pode ser vazio').notEmpty();
	req.assert('dt', 'Data de nascimento não pode ser vazio').notEmpty();
	req.assert('sexo','Sexo não pode estar vazio').notEmpty();
	var erros = req.validationErrors();

	if(erros){
		res.render('cadastro', {validacao: erros, dadosForm: dadosForm});
		return;
    }
    var cadastro = new Cadastro(
        {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            telefone:req.body.telefone,
            sexo:req.body.sexo,
            data_de_nascimento: req.body.dt
        });
    cadastro.save(function (err) {
        if (err) return handleError(err);
        console.log("ok");
    });
}
exports.consultar = function(req,res,next){
    Cadastro.find()
    .sort([['nome', 'descending']])
    .exec(function (err, lista_cad) {
        if (err) { return next(err); }
        // Successful, so render.
        res.render('consultar', { cad_lista: lista_cad });
    })


}
exports.cadastro_update_get = function (req, res, next) {
    Cadastro.findOne(req.body.id, function (err, author) {
        if (err) { return next(err); }
        if (author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        erros=req.validationErrors();
        // Success.
        var dadosForm = author;
        res.render('cadastro', {validacao: erros,dadosForm: dadosForm });

    });
};
