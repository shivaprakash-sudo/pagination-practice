import express from 'express';
import mongoose from 'mongoose';

import User from './models/users.js';
import paginatedResultsOf from './middleware.js';

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.connect("mongodb://localhost/pagination-practice", () => {
    console.log("Connected to mongoose");
}).catch(err => {
    console.log(err);
});

const db = mongoose.connection;

db.once("open", async () => {
    if (await User.countDocuments().exec() > 0) return;

    Promise.all(
        [
            User.create({ name: "User 1" }),
            User.create({ name: "User 2" }),
            User.create({ name: "User 3" }),
            User.create({ name: "User 4" }),
            User.create({ name: "User 5" }),
            User.create({ name: "User 6" }),
            User.create({ name: "User 7" }),
            User.create({ name: "User 8" }),
            User.create({ name: "User 9" }),
            User.create({ name: "User 10" }),
            User.create({ name: "User 11" }),
            User.create({ name: "User 12" }),
            User.create({ name: "User 13" }),
        ]
    ).then(() => console.log("Added the users"));
});

// // local database
// const users = [];
// const posts = [];

// for (let i = 0; i < 50; i++) {
//     users.push({
//         id: i,
//         name: `User ${i}`
//     });
//     posts.push({
//         id: i,
//         name: `Post ${i}`
//     });
// }

// app.get("/posts", paginatedResultsOf(User), (req, res) => {
//     res.send(res.paginatedResults);
// });

app.get("/users", paginatedResultsOf(User), (req, res) => {
    res.send(res.paginatedResults);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});