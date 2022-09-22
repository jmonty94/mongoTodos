require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./models');

const app = express();

const PORT = process.env.PORT || 3001;



mongoose.connect(process.env.MONGO_CONNECT)
    .then(() => {
        console.log(`success`);
    })
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/users', async (req, res) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            age: req.body.age,
            weapons: {
                primaryWeapon: req.body.primaryWeapon,
                secondaryWeapon: req.body.secondaryWeapon,
            },
            hobbies: [
                req.body.hobbies
            ],
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.put('/api/users/:userId', async (req, res) => {
    try {
        /*
        findByIdAndUpdate takes 3 params
        1st is the ID we are updating
        2nd is what updates we are making
        3rd is the configuration e.g should we call schema "hooks"
        */

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { ...req.body },
            {
                new: true
            },
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.put('/api/users/addHobby/:userId', async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            // delete all matching data from array
            {
                $addToSet: {
                    hobbies: req.body.hobby
                }
            //     $pull: {
            //         hobbies: req.body.hobby,
            //     }
            // },
            // add to an array but will add even if data already exists in 
            // {
            //     $push: {
            //         hobbies: req.body.hobby,
            //     }
            },
            
            {
                new: true,
            },
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });     
    }
});
app.delete('/api/users/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});