require('dotenv').config();
const { User, Todo } = require('./../models')

const todos = require('./todos');
const users = require('./users');
const mongoose = require('mongoose')


const seeder = async () => {
    await mongoose.connect(process.env.MONGO_CONNECT);

    await User.deleteMany();
    await Todo.deleteMany();

    const newUsers = await User.insertMany(users)

    todos.forEach((todo, index) => {
        if (index === 0 || index === 1) {
            todo.userId = newUsers[0]._id;
        }
        if (index === 2 || index === 3) {
            todo.userId = newUsers[1]._id;
        }
        if (index === 4 || index === 5) {
            todo.userId = newUsers[2]._id;
        }

    });

    await Todo.insertMany(todos)

    // const foundTodos = await Todo.find().populate([
    //     {
    //         path: 'userId',
    //         populate: {
    //             path: 'createdById',
    //         }
    //     },
    //     {
    //         path: 'authorId',
    //         populate: {
    //             path: 'createdById',
    //         }
    //     },
    //     {
    //         path: 'lastUpdatedById',
    //         populate: {
    //             path: 'createdById',
    //         }
    //     },
    // ]);
    //    const foundTodos = await Todo.find().populate({
    //     path: 'userId',
    //     populate: {
    //         path: 'createdById',
    //     }
    //    })
       const foundTodos = await Todo.find().populate({
        path: 'userId',
        select: '-email -age',
    })
    console.log(foundTodos);
    process.exit(0)
};

seeder();