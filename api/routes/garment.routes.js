module.exports = (app) => {
    const garment = require('../controllers/garment.controller');
    const auth = require('../middleware/auth');

    app.get('/api/v1/garment', garment.getAll);
    app.get('/api/v1/garment/:garmentId', garment.getById);
    app.post('/api/v1/garment/create', garment.create);
}