require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const todosRoutes = require("./todoRoutes");
const path = require('path');
const port=process.env.PORT||3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/todos", todosRoutes);
app.use(express.static("dist"));

app.get("/", (req, res) => {
    console.log(path.join(__dirname,'/dist','/index.html'))
    res.sendFile(path.join(__dirname,'/dist','/index.html'));
});

app.listen(port, () => {
    console.log(`Server has started in http://localhost:${port}/`);
});