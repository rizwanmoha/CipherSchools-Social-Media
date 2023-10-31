const express = require('express');
const { requireSignIn } = require('../middleware/authUser.js');

const {createComment , replyOnComment} = require('../controller/commentController.js');

const router = express.Router();


router.post('/create-comment/:id' , requireSignIn , createComment );

router.post('/replyonComment/:id' ,requireSignIn , replyOnComment );


module.exports = router;
