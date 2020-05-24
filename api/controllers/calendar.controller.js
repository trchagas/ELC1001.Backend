const Calendar = require('../models/calendar.model');

// Dica: você pode usar req.user para acessar informações do usuário que está fazendo a request.

exports.getLook = async (req, res) => {
    try {
        // Esse rota deve retornar o look usado pelo usuário no dia (parâmetro day)
        // e turno (parâmetro shift) especificado.

        // Preste atenção para padronizar o dia recebido de forma que a hora não influencie
        // o resultado da busca. Use apenas o dia (e.g. 31/12/2000).
        const look = await Look.findOne(
            {
                "day":   req.params.day.getDate(),
                "shift": req.params.shift
            }
        );

        // Se não houver look neste dia, retorne null.
        if(!look){
            return null;
        }
        
        // Pesquise qual deve ser o código de retorno HTTP quando a requisição foi bem sucedida.
        return res.json(look);
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

        // Preste atenção para padronizar o dia recebido de forma que a hora não influencie
        // ou não fique salva no banco. Use apenas o dia (e.g. 31/12/2000).
        let look = await Look.findOne(
            {
                "day":   req.user.params.day.getDate(),
                "shift": req.user.params.shift
            }
        );

        // Se já houver um look atribuído para esse mesmo dia e turno, sobrescreva-o.
        if(!look){
            look = await Look.create(
                {
                    "id":    req.user.params.id,
                    "day":   req.user.params.day.getDate(),
                    "shift": req.user.params.shift
                }
            );
        } else {
            look = await Look.update(
                {
                    "id":    req.user.params.id,
                    "day":   req.user.params.day.getDate(),
                    "shift": req.user.params.shift
                }
            );
        }
        
        // Pesquise qual deve ser o código de retorno HTTP quando a requisição foi bem sucedida.
        return res.json(look);
    }
    catch(err) {
        console.error(err, err.message, err.stack);

        return res.status(500).send({
            message: "Error setting look for day"
        });
    }
};