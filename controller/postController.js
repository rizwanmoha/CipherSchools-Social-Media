const postModel = require('../models/postModel');

exports.createPost = async(req , res) =>{

    try{
        const {title , description  , image ,userId } = req.body;
        if(!title || !description || !image || !userId){
            return res.status(400).send({success : false , message : "Please Fill all the fields "});
        }

        const post = await new postModel({title , description , image , userId}).save();
        return res.status(201).send({
            success : true,
            message : "Post created Successfully ",
            post
        })


        

    }catch(error){
            return res.status(500).send({
                success : false , 
                message : 'Error  while creating the post',
                error
            })
    }
}

exports.deletePost = async(req , res) =>{

    try{
        const id = req.params.id;
         pid = id.slice(1);
        const userId = req.body.userId;
       

        const post = await postModel.findById(pid);
        if(!post){
            return res.status(409).send({success : false , message : "This post didn't exist"});
        }
        
        if (post.userId.toString() !== userId) {
            return res.status(403).send({ success: false, message: "You are not authorized to delete this post" });
        }

        await postModel.findByIdAndDelete(pid);

        return res.status(201).send({success : true , message : "Post Deleted successfully"});



    }
    catch(error){
        return res.status(500).json({ success: false, message: "An error occurred while deleting the post" });
    }
}


exports.searchAllPostByUser = async(req , res) =>{
    try{
        const id = req.params.id;

        const uid = id.slice(1);

        const post = await postModel.find({userId : uid}).sort({ createdAt: -1 });

        return res.status(201).send({success : true , message : "All post" , post});

    }
    catch(error){
        return res.status(500).send({success : false , message : "An error occurred while "})
    }
}

exports.searchAllPost = async(req , res) =>{

    try{
        const post = await postModel.find({}).sort({createdAt: -1});

        return res.status(201).send({success : true , message : "All post" , post} );

    }
    catch(error){
        return res.status(500).send({success : false , message : "An error occurred while getting all post"});
        
    }
}

exports.searchByHashtag = async(req , res) =>{
    try{

        const { hashTag } = req.params;
        const searchWord = hashTag.slice(1);
        
        const post = await postModel
            .find({
                $or: [
                    { title: { $regex: searchWord, $options: "i" } },
                    { description: { $regex: searchWord, $options: "i" } },
                ],
            });

            return res.status(201).send({success : true , message : "All post with a particular hashtag" , post}); 
            
        

    }catch(error){

        return res.status(500).send({success : false , message : "An error occurred while getting  post with a hashTag"});
    }

}