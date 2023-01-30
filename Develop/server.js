const express = require("express");
const app = express();
const PORT = process.env.PORT || "3000"
const path = require('path');
const noteDb = require("./db/db.json")
const uuid = require("uuid")
const fs = require("fs")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// const allRoutes = require("./controllers");
// app.use(allRoutes)

app.get('/notes',(req,res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes',(req,res)=> res.send(noteDb))

app.post('/api/notes',(req,res)=>{
    fs.readFile("./db/db.json","utf-8",((err,data)=>{
        if(err){
            res.status(500).send("woopsie")
            throw err
        } else {
            const noteData = JSON.parse(data);
            noteData.push(req.body)
            fs.writeFile("./db/db.json",JSON.stringify(noteData,null,4),(err)=>{
                if (err){
                    res.status(500).send("woopsie!")
                    throw err
                } else{
                    res.send("data added")
                }
            })
        }
    }))
    // console.log(req.body)
    // noteDb.push(req.body)
    res.send("post request received")
})

app.get('*',(req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html') ));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);