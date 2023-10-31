const commentModel = require('../models/commentModel');
const postModel = require('../models/postModel');
const userModel = require('../models/userModel');


// This function is for comment

exports.createComment = async(req , res) =>{

    try{
        const {id} = req.params;

        const uid = id.slice(1);

        const {pid , data} = req.body;

        const comment = await new commentModel({
            data ,
            userId : uid ,
            postId: pid,
        }).save();

        const post = await postModel.findById(pid);

       
         post.comments.push(comment._id);

         await post.save();

         const user = await userModel.findById(uid);

         user.comments.push(comment._id);
         await user.save();

        
        return res.status(201).send({success : true , message : "Successfully Commented" , comment});





    }
    catch(error){
        return res.status(500).send({success : false , message : "An error occurred while commenting "});

    }
}

//This function is for reply on a comment


exports.replyOnComment = async(req , res) =>{
    try{
        
        const {id} = req.params;
        const cid = id.slice(1);

        

        const {content , userId} = req.body;

        const comment = await commentModel.findById(cid);
      
        if(!comment){
            return res.status(409).send({success : false , message : "This comment is not existing"});
        }
        const replyToComent = {
            content: content, 
            userId: userId, 
        };

       
        comment.replies.push(replyToComent);

        
        await comment.save();

        return res.status(201).send({success : true , message : "replied successfully"});




    }
    catch(error){

        return res.status(500).send({success : false , message : "An error occured while replying"});

    }

}




