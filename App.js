const { json } = require('body-parser');
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const userRouter=require('./Routes/users');
const app=express();

app.use(json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('Public'));

app.use(cors());
app.use('/users',userRouter);
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('Index');
})


mongoose.connect('mongodb://127.0.0.1/multer').then(()=>{
    console.log('Mongoose Successfully Connected')
}).catch((e)=>{
    console.log(e);
})


app.listen(5000);