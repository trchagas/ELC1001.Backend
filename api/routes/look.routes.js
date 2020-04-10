module.exports = (app) => {
    const look = require('../controllers/look.controller');
    const auth = require('../middleware/auth');

    app.get('/api/v1/look', look.getAll);
    app.get('/api/v1/look/:lookId', look.getById);
    app.post('/api/v1/look/create', look.create);
}