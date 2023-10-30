const express = require('express');

const {requireSignIn} = require('../middleware/authUser.js');

const {createPost , deletePost , searchAllPost , searchAllPostByUser , searchByHashtag} = require('../controller/postController.js');




const router = express.Router();


router.post('/create-post' , requireSignIn ,createPost);

router.delete('/delete-post/:id' ,requireSignIn , deletePost);


router.get('/allpost/:id' ,requireSignIn , searchAllPostByUser);

router.get('/allpost' ,requireSignIn ,  searchAllPost);

router.get('/search/:hashTag' ,requireSignIn , searchByHashtag );






module.exports = router;