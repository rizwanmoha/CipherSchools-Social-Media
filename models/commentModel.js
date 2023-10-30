const mongoose = require('mongoose');

const commentSchema = new  mongoose.Schema({
    data: {
        type : String , 
        required : [true , "Comment data is required"],

    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true, "user id is required"],
      },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        require: [true, "user id is required"],
      },

     

    

},
{timestamps: true },

);

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;