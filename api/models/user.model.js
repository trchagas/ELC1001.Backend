const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const NameSchema = mongoose.Schema({
    first: String,
    last: String
});

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username required']
    },
    name: {
        type: NameSchema,
        required: [true, 'Name required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email required'],
        lowercase: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    password: {
        type: String,
        required: [true, 'bcrypt password hash required'],
        validate: {
            validator: function(value) {
                return true;
                // This is commented out for testing purposes, once the API
                // is released we SHOULD NOT receive the password as plaintext
                // even though the API is using HTTPS

                // return value.length == 60 && value.startsWith("$2");
            },
            message: props => `${props.value} is not a valid bcrypt hash!`
        },
    },
    gender: String,
    phone: String,
    account_activated: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

UserSchema.virtual('fullName').get(function () {
    return this.name.first + ' ' + this.name.last;
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    next();
});

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    return token;
}

UserSchema.statics.findByEmail = async (email, password) => {
    const user = await User.findOne({ email} );

    if (!user) {
        throw new Error('Invalid login credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }

    return user;
}

UserSchema.statics.findByUsername = async (username, password) => {
    const user = await User.findOne({username});

    if (!user) {
        throw new Error('Invalid login credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }

    return user;
}

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();

    delete obj.password;
    delete obj.tokens;

    return obj;
}

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = User;