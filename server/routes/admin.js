const express = require("express");
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminLayout = '../views/layouts/admin'
const jwtSecret = process.env.JWT_SECRET;

/* Check login*/

const authMiddleware = (req,res,next) => {

  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message:'Unauthorized'});
   }
    try{
    const decoded = jwt.verify(token,jwtSecret);
    req.userid = decoded.userId;
    next();
     }catch(error){
    res.status(401).json({message :"Unautherized"})
  }
}



/* adminlogin*/

 router.get('/admin',async(req,res)=>{
      
    try{
    
           const locals ={
            title:"admin",
            description:"Simple blog created with NodeJs, Express & Mongodb."
        }
           res.render('admin/index',{locals ,layout:adminLayout,currentRoute: req.path });
         }catch(error){
           console.log(error);
         }
    });

/* Admin Check Login*/

router.post('/admin',async(req,res)=>{
      
  try{
   const { username,password } = req.body;
   const user = await User.findOne({username});

    if(!user){
    return res.status(401).json({message:"Invalid credentials"});
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
    return res.status(401).json({message:"Invalid credentials"});
    }
    const token = jwt.sign({userId:user._id},jwtSecret);
    res.cookie('token',token,{httpOnly:true});
    res.redirect('/dashboard');
    }catch(error)
    {
      console.log(error);
    }
  });



/* Admin Dashboard*/

router.get('/dashboard',authMiddleware,async(req,res)=>{
  
  try{
    const locals ={
      title:"Dashboard",
      description:"Simple Blog created with NodeJS,express & MongoDB"
    }
    const data = await Post.find();
    res.render('admin/dashboard',{
      locals,
      data,
      layout:adminLayout
    })
  
}catch(error)
{

}
  
});
  




/* Get Admin Create new Post */

router.get('/add-post',authMiddleware,async(req,res)=>{
  
  try{
    const locals ={
      title:"Add Post",
      description:"Simple Blog created with NodeJS,express & MongoDB"
    }
    const data = await Post.find();
    res.render('admin/add-post',{
      locals,
      data,
      layout:adminLayout
    })
  
}catch(error)
{

}
  
});


/* POST Admin Create new Post */

/* POST Admin Create new Post */
router.post('/add-post', authMiddleware, async (req, res) => {
  try {
    console.log(req.body);

    const newPost = new Post({
      title: req.body.title,
      body: req.body.body
    });

    await newPost.save();
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error creating new post:', error);
    res.status(500).send('An error occurred while creating the new post.');
  }
});




/* Get Admin new Post */

router.get('/edit-post/:id', authMiddleware, async (req, res) => {

  try {
    const locals = {
      title: "Edit Post",
      description: "Free NodeJs User Management System",
    }

    const data = await Post.findOne({ _id: req.params.id });
    res.render('admin/edit-post', {
      locals,
      data,
      layout: adminLayout
    });
  } catch (error) {
    console.log(error);
  }

});



/* PUT Admin new Post */

router.put('/edit-post/:id',authMiddleware,async(req,res)=>{
  
  try{
    await Post.findByIdAndUpdate(req.params.id,{
      title:req.body.title,
      body:req.body.body,
      updatedAt:Date.now()
    })
  //res.redirect(`/edit-post/${req.params.id}`);
  res.redirect('/dashboard');
 
}catch(error)
{
console.log(error);
}
  
});


  // router.post('/admin',async(req,res)=>{
      
  //   try{
  //    const { username ,password} = req.body;
  //    if(req.body.username === 'admin'  && req.body.password === "password")
  //    {
  //      res.send('You are logged in.');
  //    }else{
  //     res.send('wrong username or password')
  //    }
  
  //        }catch(error){
  //          console.log(error);
  //        }
  //   });

  /* Admin Register*/

router.post('/register',async(req,res)=>{
      
  try{
   const { username ,password} = req.body;
   const hashedPassword = await bcrypt.hash(password,10);
   
   try{
    const user = await User.create({username,password:hashedPassword});
    res.status(201).json({message:"User Created",user});
   }catch(error){
         if(error.code === 1100){
          res.status(409).json({message:"User already in use"});
         }
         res.status(500).json({message:"Internal server error"})
       }
      }catch(error){
        console.log(error);
      }
  });


 /* Delete admin-Delete Post*/

 router.delete('/delete-post/:id',authMiddleware,async(req,res)=>{
  try{
    await Post.deleteOne({_id:req.params.id});
    res.redirect('/dashboard');
  }catch(error){
    console.log(error);
  }
 });


 /* Admin logout*/
router.get('/logout',(req,res)=>{
  res.clearCookie('token');
  //res.json({message:'Logout Successful'});
  res.redirect('/');
});

module.exports = router;