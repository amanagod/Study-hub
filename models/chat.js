const mongoose = require('mongoose');
require('dotenv').config()

main().then(()=>{console.log('chats database connection succesfull')})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.url);
}

const chatschema = new mongoose.Schema({
    name:{
        type : String,
        maxLength:50
    },
    discription:{
        type : String
    },
    created_at:{
        type : Date,
        required:true,
    }

});

const chat = mongoose.model("Chat", chatschema);

// const p1 = new chat({
    // name:"ram",
//     discription:"Hii",
//     created_at : new Date(),
// });

// p1.save().then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err)
// })

module.exports=chat;