const { randomUUID } = require('crypto');
const express =require('express');
const router = express.Router();
const fs = require('fs');
const { restart } = require('nodemon');
const readFile = require("../utils/helpers");
const { v4: uuidv4 } = require('uuid');

router.get("/",(req,res) =>{
    const fileContent = readFile("./data/video-list.json");
    const list = []
    for(i=0;i<fileContent.length;i++){
        console.log([i])
        const video = {
            id : fileContent[i].id,
            title : fileContent[i].title,

            channel : fileContent[i].channel,
            image : fileContent[i].image,
        }
        list.push(video)
    }
    res.status(200).json(list);
}).get("/:id", (req, res)=> {
    const fileContent = readFile("./data/video-list.json");
    console.log('test')
    const currentvid = fileContent.find((video) => video.id == req.params.id)
    
    res.status(200).json(currentvid);

})

router.post("/", (req, res)=> {
    // axios.post("/notes", {title: "title", content: "content"})

    console.log(req.body);
    console.log("hi")
    console.log(req.query)
    const newNote = {
        "title": req.body.title,
        "channel": "Red Cow",
        "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
        "image": "https://i.imgur.com/l2Xfgpl.jpg",
        "description": req.body.description,
        "views": "1,001,023",
        "likes": "110,985",
        "duration": "4:01",
        "timestamp": Date.now(),
        "comments":[],
        "id":uuidv4(),

    }
    const fileContent = readFile("./data/video-list.json");
    fileContent.push(newNote);
    fs.writeFileSync("./data/video-list.json", JSON.stringify(fileContent));

    res.status(201).json(newNote);
}).post("/:id", (req, res)=> {
    console.log(req.body);
    console.log("hi")
    console.log(req.query)
    const newNote = {
        "name":req.body.name,
        "comment":req.body.comment,
        "likes":0,
        "id":uuidv4(),


    }
    const fileContent = readFile("./data/video-list.json");
    fileContent.push(newNote);
    fs.writeFileSync("./data/video-list.json", JSON.stringify(fileContent));

    res.status(201).json(newNote);
});
module.exports = router;