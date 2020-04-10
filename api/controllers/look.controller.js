const Look = require('../models/look.model');

// Dica: você pode usar req.user para acessar informações do usuário que está fazendo a request.

exports.getAll = async (req, res) => {
    try {
        // Esse rota deve retornar todos os looks *que pertencem ao usuário*.
        // Você deve popular as referências para as roupas (clothe_torso, clothe_leg, clothe_feet).

        // Você deve ordenar a resposta de forma que os looks que foram criados
        // por último apareçam primeiro. Estude o exemplo do arquivo garment.controller.js
        // para ver como você pode ordenar os resultados diretamente no banco de dados.
        
        // Pesquise qual deve ser o código de retorno HTTP quando a requisição foi bem sucedida.
    }
    catch(err) {
        console.error(err, err.message, err.stack);

        return res.status(500).send({
            message: "Error retrieving looks"
        });
    }
};

exports.getById = async (req, res) => {
    try {
        // Essa rota deve retornar todas as informações de um look *se ele pertencer ao usuário*.
        // Você deve popular as referências para as roupas (clothe_torso, clothe_leg, clothe_feet).

        // Você pode escolher como retornar os dados, contanto que todas as informações
        // do look estejam presentes.

        // Pesquise qual deve ser o código de retorno HTTP quando a requisição foi bem sucedida.
    }
    catch(err) {
        console.error(err, err.message, err.stack);

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Look not found with id " + req.params.lookId
            });
        }

        return res.status(500).send({
            message: "Error retrieving look with id " + req.params.lookId
        });
    }
};

exports.create = async (req, res) => {
    try {
        // Essa rota deve criar um novolook no banco de dados e atribuir ele
        // ao usuário que está fazendo a requisição.

        // Você pode escolher se quer retornar as informações do look criado.
        // Pesquise qual deve ser o código de retorno HTTP quando um novo recurso foi criado no banco.
    }
    catch(err) {
        console.error(err, err.message, err.stack);

        res.status(500).send({
            message: err || "An error occured when creating the look."
        });
    }
};