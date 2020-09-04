const Look = require('../models/look.model')
const Calendar = require('../models/calendar.model');

// Dica: você pode usar req.user para acessar informações do usuário que está fazendo a request.

exports.getLook = async (req, res) => {
    try {
        // Esse rota deve retornar o look usado pelo usuário no dia (parâmetro day)
        // e turno (parâmetro shift) especificado.

        // Preste atenção para padronizar o dia recebido de forma que a hora não influencie
        // o resultado da busca. Use apenas o dia (e.g. 31/12/2000).
        const providedDate = new Date(req.body.date);
        const formatedDate = new Date(providedDate.getYear(), providedDate.getMonth(), providedDate.getDate(), 0, 0, 0, 0);

        const look = await Look.findOne(
            {
                "day":   formatedDate.getTime(),
                "shift": req.body.shift,
            }
        );

        // Se não houver look neste dia, retorne null.
        if(!look){
            return res.json(look);
        }
        
        // Pesquise qual deve ser o código de retorno HTTP quando a requisição foi bem sucedida.
        return res.status(200).send(look);
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
        const providedDate = new Date(req.body.date);
        const formatedDate = new Date(providedDate.getYear(), providedDate.getMonth(), providedDate.getDate(), 0, 0, 0, 0);

        let look = await Look.findOne(
            {
                "day":   formatedDate.getTime(),
                "shift": req.body.shift,
            }
        );

        // Se já houver um look atribuído para esse mesmo dia e turno, sobrescreva-o.
        if(!look){
            look = await Look.create(
                {
                    "id":    req.body.id,
                    "day":   formatedDate.getTime(),
                    "shift": req.body.shift,
                }
            );
        } else {
            look = await Look.update(
                {
                    "id":    req.body.id,
                    "day":   formatedDate.getTime(),
                    "shift": req.body.shift,
                }
            );
        }
        
        // Pesquise qual deve ser o código de retorno HTTP quando a requisição foi bem sucedida.
        return res.status(200).send(look);
    }
    catch(err) {
        console.error(err, err.message, err.stack);

        return res.status(500).send({
            message: "Error setting look for day"
        });
    }
};