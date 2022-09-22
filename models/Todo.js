const { Schema, model } = require('mongoose');

const todoSchema = new Schema(
    {
        todo: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        // authorId: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // },
        // lastUpdatedById: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // }
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     refPath: 'fromId'
        // },
        // fromId: {
        //     type:String,
        //     enum: [
        //         'User'
        //     ]
        // }
    },
    {
        timestamps: true
    }
);


module.exports = model('Todo', todoSchema);