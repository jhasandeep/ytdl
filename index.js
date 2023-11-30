const express = require("express"); 

const ytdl = require("ytdl-core");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs"); 
const os = require("os"); 


const app = express(); 

// middleware 
app.use(cors());
app.use(bodyParser.urlencoded({extended:false, }));
app.use(bodyParser.json());

app.get("/", (req, res)=>{

    res.sendFile(__dirname + "/index.html");
});


app.post("/", async (req, res) => {
    try {
      const videoLink = req.body.link;
    //   console.log(videoLink);
      const info = await ytdl.getInfo(videoLink);
      const format = ytdl.chooseFormat(info.formats, { quality: "highest" });
      const title = info.videoDetails.title;
  
      res.setHeader(
        "Content-Disposition",
        `attachment; filename*=UTF-8''${encodeURIComponent(title)}.mp4`
      );
      ytdl(videoLink, { format }).pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });
  
  const port = process.env.PORT || 3000;
  
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

