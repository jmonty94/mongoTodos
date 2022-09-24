const {Schema, model } = require('mongoose');

// Virtuals are values that we can calculate based on the current document that we are looking at. these values are not saved to the Db but we can query for them when we receive the data

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
    hobbyIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Hobby'
        }
    ]
},{
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});


//virtual creation
//takes 1 param what is the name of the field when we get the docs
userSchema.virtual('fullName').get(function() {
    //this = 1 document or 1 user in this instance
    return `${this.firstName} ${this.lastName}`
});
userSchema.virtual('hobbyCount').get(function() {
    //this = 1 document or 1 user in this instance
    return this.hobbyIds.length;
});



// making own queries attached to the model
userSchema.statics.findByFirstName = async function(firstName) {
    return await this.find({ firstName });
};

userSchema.methods.sayGreeting = function() {
    console.log(`
    Hello my name is ${this.firstName} ${this.lastName} and my weapons are ${this.weapons.primaryWeapon} and ${this.weapons.secondaryWeapon}
    `);
};


module.exports = model('User', userSchema);