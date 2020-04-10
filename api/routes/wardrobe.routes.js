module.exports = (app) => {
    const wardrobe = require('../controllers/wardrobe.controller');
    const auth = require('../middleware/auth');

    app.get('/api/v1/wardrobe', wardrobe.getAll);
    app.get('/api/v1/wardrobe/:wardrobeId', wardrobe.getById);
    app.post('/api/v1/wardrobe/create', wardrobe.create);
    app.post('/api/v1/wardrobe/:wardrobeId/add/:garmentId', wardrobe.addGarment);
}