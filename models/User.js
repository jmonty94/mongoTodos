const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: String,
    lastName: {
        type: String,
        trim: true,
        // if you want a custom error message when the user forgets to give this value we use this syntax
        required: [true, 'Last Name is required boyo']
    },
    username: {
        type: String,
        minLength: [10, `'Dude it's gotta be at least 10 characters'`],
        lowercase: true,
    },
    email: {
        type: String,
        lowercase: true,
    },
    age: Number,
    weapons: {
        primaryWeapon: {
            type: String,
            default: 'Glock 45'
        },
        secondaryWeapon: {
            type: String,
            default: 'Baseball Bat',
        },
    },
    hobbies: [
        {
            type: String,
            default: [],
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});


module.exports = model('User', userSchema)