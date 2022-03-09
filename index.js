const express = require('express')
const res = require('express/lib/response')
const app = express()
const readFile = require("./utils/helpers")
const videoListRouter = require("./routes/videoListRouter")
const cors = require('cors');



app.use(express.json());
app.use(cors());

app.use("/videos/", videoListRouter )

app.get('/', function (req,res){
    res.send('welcome to the')
});
app.use("/img",express.static("public/images"));
app.listen(8080,function(){

    console.log('hello world')
})