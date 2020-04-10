const Calendar = require('../models/calendar.model');

// Dica: você pode usar req.user para acessar informações do usuário que está fazendo a request.

exports.getLook = async (req, res) => {
    try {
        // Esse rota deve retornar o look usado pelo usuário no dia (parâmetro day)
        // e turno (parâmetro shift) especificado.

        // Se não houver look neste dia, retorne null.

        // Preste atenção para padronizar o dia recebido de forma que a hora não influencie
        // o resultado da busca. Use apenas o dia (e.g. 31/12/2000).
        
        // Pesquise qual deve ser o código de retorno HTTP quando a requisição foi bem sucedida.
    }
    catch(err) {
        console.error(err, err.message, err.stack);

        return res.status(500).send({
            message: "Error retrieving look for day"
        });
    }
};

exports.setLook = async (req, res) => {
    try {
        // Esse rota deve settar o look usado pelo usuário no dia (parâmetro day)
        // e turno (parâmetro shift) especificado.

        // Preste atenção para garantir que o look recebido realmente pertence ao usuário
        // que está fazendo a request.

        // Se já houver um look atribuído para esse mesmo dia e turno, sobrescreva-o.

        // Preste atenção para padronizar o dia recebido de forma que a hora não influencie
        // ou não fique salva no banco. Use apenas o dia (e.g. 31/12/2000).
        
        // Pesquise qual deve ser o código de retorno HTTP quando a requisição foi bem sucedida.
    }
    catch(err) {
        console.error(err, err.message, err.stack);

        return res.status(500).send({
            message: "Error setting look for day"
        });
    }
};