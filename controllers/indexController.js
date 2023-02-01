const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require('path');
const apiRoutes = require('./apicontroller.js')

router.use('/api/notes',apiRoutes)

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

router.get('*',(req,res) =>
    res.sendFile(path.join(__dirname, './index.html') ));

  module.exports = router