const mongoose = require('mongoose');
require('dotenv').config()

main().then(()=>{console.log('data database connection succesfull')})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.url);
}

const schema = new mongoose.Schema({
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
    },
    url : {
        type:String,
        required:true,
    },

});

const data = mongoose.model("data", schema);


// const p1 = new data({
//     name:"new1",
//     discription :"jiesh",
//     url : "public\\uploads\\ShubhamJaiswalResume.pdf-1747471041901",
//     created_at : new Date(),
// });

// p1.save().then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err)
// })



module.exports=data;