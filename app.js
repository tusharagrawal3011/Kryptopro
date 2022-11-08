const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static('public'))

app.get("/",(req, res) => {
    // condition which template to show
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000);