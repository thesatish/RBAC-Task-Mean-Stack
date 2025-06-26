require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mainRouter = require('./Routes/mainRouter');
const publicRouter = require('./Routes/publicRouter');
const authenticateToken = require('./Middleware/auth');
// require('./Controllers/utilities/redis')

require("./config/database");
var cors = require('cors');
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));


app.get('/test', (req, res) => {
    res.send({ status: true, message: "Hello Satish Public Backend" });
})


app.use(publicRouter);
app.use(authenticateToken);
app.use(mainRouter);

app.get('/testP', (req, res) => {
    res.send({ status: true, message: "Hello Satish Protected Backend" });
})

app.listen(port, () => console.log(`listening on port ${port}!`))

