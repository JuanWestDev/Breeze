import express from "express";
import multer from "multer";
import he from "he";
import { dirname, join } from "path";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
import { stringify } from "querystring";

const app = express();
const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({storage: storage });

const port = 3000;
app.use(express.static("public"));

var userIsAuthorised = false;
var isPostEmpty = true;
var myContent = "";
var postId = "";
var myImgFile = "";
var userProfilePicture = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function passwordChecker(req, res, next){
    const username = req.body.username;
    const password = req.body.password;

    if (username === "Juan" && password === "admin"){
       userIsAuthorised = true;
    }
    next();
}
app.use(passwordChecker);


function createPost (req,res,next) {
    const userText = req.body.userText;

    if (userText != "hiFXzyONy2f3BR506emCj7OLyYtV29u6n6bmtoFPehosfyn3rK"){
        isPostEmpty = false;
    }
    next();
}
app.use(createPost);


app.get("/", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", (req, res) => {
    if(userIsAuthorised){
        res.redirect("/Home");
    }else{
        res.render("login.ejs");
    }
    
});


app.post("/createPost", upload.single("image"), (req, res) => {
   let id = uuidv4();
   let text = req.body.content;
   let imgFile = req.file ? req.file.originalname : null;
  
   console.log("image on server: " + imgFile);

   if(text){
    console.log("text box is not empty: " + text);
    if(text && imgFile){
            console.log("pending image upload: " + imgFile);
            console.log("rendering... ");
            console.log("sent text upload: " + text);
            console.log("sent image upload: " + imgFile);
            console.log("creating ID: " + id);

            res.json({ 
                success: true, 
                id: id, 
                newText: text,
                img: imgFile
            });
        
    }else{
        console.log("post contains only text:" + text);
        console.log("creating ID: " + id);
        res.json({ 
            success: true, 
            id: id, 
            newText: text,
        });
    }
   }else if(!text){
    console.log("post contains only a file: " + imgFile);
        if(!text && imgFile){
            res.json({ 
                success: true, 
                id: id, 
                img: imgFile
            });

        }else{
            res.render("index.ejs");
        }
   }
  
});

app.post("/profilePicture", upload.single("profile-photo"),(req, res) => { //.single("profile-photo")

    let profilePicture = req.file ? req.file.originalname : null;
    userProfilePicture = profilePicture;
    console.log("Sending image: " + userProfilePicture);
    res.redirect("/Home");

});


app.get("/Home", (req, res) => {
        res.render("index.ejs");
    });

// app.get("/Home/Timeline", (req, res) => {
//         res.render("index.ejs", {postText : myContent, profilePic: userProfilePicture, imgFile: myImgFile, postId : postId});
//     });


app.put('/Home/EditPost/:id', (req, res) => {
    const id = req.params.id;
    let text = req.body.sentText;

    console.log("Updating: " + id);
    console.log("With the Text: " + text);

    res.json({ 
        success: true, 
        id: id, 
        newText: text,
    });
  });


app.delete('/Home/DeletePost/:id', (req, res) => {
    const id = req.params.id;

    console.log("Deleting: " + id);
    res.render("index.ejs");
  });

app.listen(port, () => {
    console.log(`Capstone Project listening on port ${port}`);
});

