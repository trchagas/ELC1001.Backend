module.exports = (app) => {
    const calendar = require('../controllers/calendar.controller');
    const auth = require('../middleware/auth');

    app.get('/api/v1/calendar/:day/:shift', calendar.getLook);
    app.post('/api/v1/calendar/:day/:shift', calendar.setLook);
}