const mongoose = require('mongoose');

const CalendarSchema = mongoose.Schema({
    date: Date,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    shift: {
        type: String,
        enum: [
            "morning",
            "afternoon",
            "night"
        ]
    },
    look: {type: mongoose.Schema.Types.ObjectId, ref: 'Look'},
}, {
    timestamps: true
});

const Calendar = mongoose.model('Calendar', CalendarSchema);

module.exports = Calendar;