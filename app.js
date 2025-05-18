const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const multer  = require('multer');
const Chat = require('./models/chat.js');
const Data = require('./models/data.js');
require('dotenv').config();

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    return cb(null,"./public/uploads/");
  },
  filename:function(req,file,cb){
    return cb(null,`${file.originalname}-${Date.now()}`);
  },
});
const upload = multer({ storage: storage })

var app = express();
var port = 3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

////////////////////////////////////////////////////////////////////// notes
let docs  
// [
//             {
//               id:uuidv4(),
//               name:"3rd sem PYQ",
//               discription:" 3rd Sem previous year quesion paper for Btech Computer Science",
//               url:"./public/uploads/3rd sem question paper.pdf"
//             },
//             {
//               id:uuidv4(),
//               name:" Combinational logic ",
//               discription:"Digital Electronics notes",
//               url:"./public/uploads/Combinational logic circuits and its design.pdf"
//             },
//             {
//               id:uuidv4(),
//               name:"D_A & A_D",
//               discription:"d_a & a_d converters Notes ",
//               url:"./public/uploads/d_a & a_d converters.pdf"
//             },
//             {
//               id:uuidv4(),
//               name:"DBMS",
//               discription:"DBMS part 2 notes",
//               url:"./public/uploads/DBMS English notes part 02.pdf"
//             },
//             {
//               id:uuidv4(),
//               name:"DBMS ",
//               discription:"DBMS part1 notes",
//               url:"./public/uploads/DBMS notes english part 01.pdf"
//             },
//             {
//               id:uuidv4(),
//               name:"Datesheet",
//               discription:"Here is the 3rd Sem datesheet for Btech Computer Science",
//               url:"./public/uploads/Datesheet.pdf"
//             },

// ];
//////////////////////////////////////////////////////////////////chates
let chats =[
  // {
  //   id:uuidv4(),
  //   name:"ram",
  //   discription:"hii",
  //   date:"4/11/2025, 5:01:06 PM",
  // },
  // {
  //   id:uuidv4(),
  //   name:"shyam",
  //   discription:"what are you doing",
  //   date:"5/8/2025, 4:06:04 PM",
  // },
];
//////////////////////////////////////////////////////////////////////file handling

// let db= require("./file");


// const success= (data)=>{
//   // console.log(data);
//    docs = data;
// };
// const failure=(error)=>{
//   console.log(error);
//   };
// ///////////////////reading
// db.read()
// .then(success)
// .catch(failure);

// db.readchat()
// .then((data)=>{
//   chats=data;
// })
// .catch(failure);

/////////////////writing; line no red dot 128;



///////////////////////////////////////////////////////////////////////// home
app.get("/home", async (req,res)=>{
  // res.send("hii");
    chats = await Chat.find();
    docs = await Data.find();
    // console.log(chats);

     res.render("index.ejs",{docs,port,chats});
});
///////////////////////////////////////////////////////////////////////// All notes
app.get("/home/notes",(req,res)=>{
// res.send("working");
  res.render("notes.ejs",{docs,port});

});
//////////////////////////////////////////////////////////////////////// download 
app.get("/home/notes/:id",(req,res)=>{
let {id} = req.params;
let post=docs.find((x)=>id==x.id);
res.download(post.url);
// res.send("woeking : "+id);

});
/////////////////////////////////////////////////////////////////////// upload 
app.post("/home",upload.single("file"),  (req,res)=>{
// console.log(req.body);
// console.log(req.file);
let {name:newname,discription:newdiscription}=req.body;
// let id =uuidv4();
let newurl=req.file.path;
// docs.push({id,name,discription,url});
// db.write({id,name,discription,url})
// .then(success)
// .catch(failure);
let p1 = new Data({
  name:newname,
  discription:newdiscription,
  url:newurl,
  created_at: new Date(),
});
 p1.save().then((res)=>{
   console.log("data inserted\n"+res);
 }).catch((err)=>{
   console.log(err);
 })

res.redirect("/home");

});
//////////////////////////////////////////////////////////////////////// chats area
app.get("/home/chats",(req,res)=>{
// res.send("working");
res.render("chats.ejs",{chats,port});
});
app.get("/home/chats/new",(req,res)=>{
// res.send("workingfine here");
res.render("newchat.ejs");
});

app.post("/home/chats",(req,res)=>{
let {name,discription}=req.body;
let mydate = new Date();

// db.writechat({id,name,discription,dates})
// .then((data)=>{
//   chats=data;
//   console.log(data);
// })
// .catch(failure);
let c1= new Chat({
name:name,
discription:discription,
created_at:mydate,
});

c1.save().then((res)=>{
  console.log(res);
}).catch((err)=>{
  console.log(err);
})

res.redirect("/home");


});


////////////////////////////////////////////////////////////////////////  Listening

app.get("/",(req,res)=>{
  res.send("go on / home");
    // res.sendFile("index.html");
  });

app.listen(port,()=>{
console.log(`server working on port ${port}`);
});

