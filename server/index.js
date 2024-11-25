const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())
const db = require('./models');

//Routers
const usersRouter = require('./routes/Users');
app.use("/users", usersRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    });
});
