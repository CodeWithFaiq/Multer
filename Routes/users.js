const express=require('express');

const userModel=require('../Models/userSchema');

const multer=require('multer');
const router=express.Router();



const Storage=multer.diskStorage({
    destination:'Public/Images',
    filename:(req,file,cb)=>{
        cb(null, file.originalname );
    }
})

const upload=multer({
    storage:Storage,
    fileFilter:(req,file,cb)=>{
        if( file.mimetype == 'image/png' || file.mimetype =='image/jpeg' ){
          return  cb(null,true);
            
        }
        else{
            
            return cb(new Error('Invalid Format Type, Please try again'),false);
        }
    }
})

router.get('/',async(req,res)=>{
const users= await userModel.find();
  res.send(users);
})

router.get('/test',(req,res)=>{
    console.log(req.get('host'));
})


router.post('/', upload.single('Avatar'), async(req,res)=>{

const url=req.protocol + '://' + req.get('host');
const user=new userModel();

user.name=req.body.name;
user.image=url + '/Images/' + req.file.filename;
await user.save();




})



router.get('/edit/:id', async (req,res)=>{
    res.render('Edit');

})

router.post('/edit/:id', upload.single('Avatar'),async(req,res)=>{
    const user= await userModel.findById(req.params.id);
    
    user.image=req.file.filename;
    await user.save();
    res.redirect('/Users')
})



module.exports=router;
