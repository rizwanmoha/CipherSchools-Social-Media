const postModel = require('../models/postModel');

const userModel = require('../models/userModel');


// This function is for creating the post


exports.createPost = async(req , res) =>{

    try{
        const {title , description  , image ,userId } = req.body;
        if(!title || !description || !image || !userId){
            return res.status(400).send({success : false , message : "Please Fill all the fields "});
        }
        

       

        const post = await new postModel({title , description , image , userId}).save();
        
        const user = await userModel.findById(userId);
        user.posts.push(post._id);

        await user.save();


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

// This function is for deleting the post 

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

        const user = await userModel.findById(userId);
        user.posts.pull(pid);
       
        await postModel.findByIdAndDelete(pid);

        await user.save();

        return res.status(201).send({success : true , message : "Post Deleted successfully"});



    }
    catch(error){
        return res.status(500).json({ success: false, message: "An error occurred while deleting the post" });
    }
}


// This function is for reposting the post 


exports.repost = async(req , res) =>{
    try{
        const {id} = req.params;
        const uid = id.slice(1);

        const {pid} = req.body;
        const post = await postModel.findById(pid);

        if(!post){
            return res.status(403).send({success : false , message : "This post is not existing"});

        }

        const user = await  userModel.findById(uid) ;

       

        user.posts.push(post._id);

        await user.save();

        return res.status(201).send({success : true , message : "Resposted successfully " , post});


    }
    catch(error){
        return res.status(500).json({ success: false, message: "An error occurred while reposting" });
    }
}


// This function  will search all the post by the user which post was created at the last will come first  

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


// This will search all the post 

exports.searchAllPost = async(req , res) =>{

    try{
        const post = await postModel.find({}).sort({createdAt: -1});

        return res.status(201).send({success : true , message : "All post" , post} );

    }
    catch(error){
        return res.status(500).send({success : false , message : "An error occurred while getting all post"});
        
    }
}

 // This function is searched the hashtag

exports.searchByHashtag = async(req , res) =>{
    try{

        const { hashTag } = req.params;

        const searchWord = hashTag.slice(1);
        if(!searchWord){
            return res.status(409).send({success : false , message : " For finding any hashTag write something"});
        }
        
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