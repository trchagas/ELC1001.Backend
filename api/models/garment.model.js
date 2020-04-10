const mongoose = require('mongoose');
const validator = require('validator');

const CompositionSchema = mongoose.Schema({
    material: String,
    percentage: Number
});

const GarmentSchema = mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    public: {
        type: Boolean,
        default: true
    },
    body_part: {
        type: String,
        enum: [
            "head",
            "torso",
            "legs",
            "torso_legs",
            "feet",
            "accessory"
        ]
    },
    model: String,
    manufactor: String,
    manufactor_url: {
        type: String,
        validate: { 
            validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: false }),
            message: 'Invalid URL.' 
        }
    },
    description: String,
    composition: {
        type: [CompositionSchema],
        validate: {
            validator: function(value) {
                if(value == null || value.length == 0) {
                    return true;
                }

                var sum = 0;

                value.forEach(composition => {
                    sum += composition.percentage;
                });

                return sum == 100.0;
            },
            message: props => `${props.value} is not a valid composition. Make sure that the sum of all percentages gives 100%`
        }
    },
    default_image: {
        type: String,
        validate: {
            validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: true }),
            message: 'Invalid URL. Make sure that you specified the protocol and it is either http or https.' 
        }
    },
    variants: [{
        title: String,
        official_url: {
            type: String,
            validate: { 
                validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: false }),
                message: 'Invalid URL.' 
            }
        },
        image_urls: [{
            type: String,
            validate: { 
                validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: true }),
                message: 'Invalid URL. Make sure that you specified the protocol and it is either http or https.' 
            }
        }]
    }]
}, {
    timestamps: true
});

const Garment = mongoose.model('Garment', GarmentSchema);

module.exports = Garment;