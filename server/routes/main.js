const express = require("express");
const router = express.Router();
const Post = require('../models/Post');


/**
 * Get/
 * Home
 */
router.get('', async (req, res) => {
  try {
      const locals = {
          title: "CatSLover",
          description: "Simple Blog created with NodeJS, Express & MongoDB"
      }
      let perPage = 10;
      let page = req.query.page || 1;

      const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec();

      const count = await Post.countDocuments();
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);

      res.render('index', {
          locals,
          data,
          current: page,
          nextPage: hasNextPage ? nextPage : null,
          currentRoute:'/'
      });

  } catch (error) {
      console.log(error);
  }

});



/**
 * Get/
 * post:id
 */
    
router.get('/post/:id',async(req,res)=>{
      
         try{
            let slug = req.params.id;

            const data = await Post.findById({ _id:slug });

            const locals ={
                title:data.title,
                description:"Simple blog created with NodeJs, Express & Mongodb.",
                currentRoute:`/post/${slug}`
            }
         
          res.render('post',{locals,data});
         }catch(error){
           console.log(error);
         }
     });

/**
 * POST/
 * post:searchTerm
 */

 
router.post('/search',async(req,res)=>{
     try{
        const locals ={
            title:"Search",
            
            description:"Simple blog created with NodeJs, Express & Mongodb."
        }
          let searchTerm = req.body.searchTerm;
          const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
           const data = await Post.find({
            $or:[
                { title:{$regex: new RegExp(searchNoSpecialChar,'i')}},
                { body :{$regex :new RegExp(searchNoSpecialChar,'i')}} 
            ]
           });

            res.render("search",{
                data,
                locals
            });

     }catch(error){
      console.log(error);
     }
    
 });



router.get('/about',(req,res)=>{
    res.render('about',{
    currentRoute:'/about'
    });
});


router.get('/videos',(req,res)=>{
    res.render('videos',{
    currentRoute:'/videos'
    });

});

router.get('/gallery',(req,res)=>{
    res.render('gallery',{
    currentRoute:'/gallery'
    });

});



router.get('/contact',(req,res)=>{
    res.render('contact',{
    currentRoute:'/contact'
    });
});


router.get('/views/cymriccat', (req, res) => {
    res.render('cymriccat'); 
});

router.get('/views/british', (req, res) => {
    res.render('british'); 
});

router.get('/views/mainecoon', (req, res) => {
    res.render('mainecoon'); 
});

router.get('/views/Siamese', (req, res) => {
    res.render('Siamese'); 
});

router.get('/views/ragamuffin', (req, res) => {
    res.render('ragamuffin'); 
});

router.get('/views/birman', (req, res) => {
    res.render('birman'); 
});

router.get('/views/ragdoll', (req, res) => {
    res.render('ragdoll'); 
});
router.get('/views/persion', (req, res) => {
    res.render('persion'); 
})

router.get('/views/siberian', (req, res) => {
    res.render('siberian'); 
});

router.get('/views/persioncat', (req, res) => {
    res.render('persioncat'); 
})

router.get('/views/bombaycat', (req, res) => {
    res.render('bombaycat'); 
})

router.get('/views/american', (req, res) => {
    res.render('american'); 
})

router.get('/views/sph', (req, res) => {
    res.render('sph'); 
})

router.get('/views/manx', (req, res) => {
    res.render('manx'); 
})

router.get('/views/balinese', (req, res) => {
    res.render('balinese'); 
})

router.get('/views/botail', (req, res) => {
    res.render('botail'); 
})

router.get('/views/somali', (req, res) => {
    res.render('somali'); 
})

router.get('/views/burmilla', (req, res) => {
    res.render('burmilla'); 
})

router.get('/views/toy', (req, res) => {
    res.render('toy'); 
})

router.get('/views/jepanese', (req, res) => {
    res.render('jepanese'); 
})

router.get('/views/color', (req, res) => {
    res.render('color'); 
})

router.get('/views/mist', (req, res) => {
    res.render('mist'); 
})

router.get('/views/turkish', (req, res) => {
    res.render('turkish'); 
})

router.get('/views/oci', (req, res) => {
    res.render('oci'); 
})

router.get('/views/forest', (req, res) => {
    res.render('forest'); 
})

router.get('/views/scot', (req, res) => {
    res.render('scot'); 
})

router.get('/views/burmese', (req, res) => {
    res.render('burmese'); 
})

router.get('/views/curl', (req, res) => {
    res.render('curl'); 
})

router.get('/views/munchkin', (req, res) => {
    res.render('munchkin'); 
})

router.get('/views/chart', (req, res) => {
    res.render('chart'); 
})

router.get('/views/aby', (req, res) => {
    res.render('aby'); 
})
module.exports = router

