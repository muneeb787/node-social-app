import postModel from "../../models/posts.js";


const postCommentsController = {
    getAll: async (req,res)=>{
        const {postId} = req.params;
        try{
            const post = await postModel.findById(postId);
            if(post)
            {
                console.log(post,"post is:")
                const comments = await post.comments;
                console.log(comments,"comment is:")
                if(comments)
                {
                    
                        return res.status(200).json({ success: true, data: comments });
                }
                else
                {
                    return res.status(400).json({ success: false, message: "Commented Error" });

                }
                
            }
            else
            {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch(e)
        {
            console.log(e,"error")
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    countComments: async (req,res)=>{
        const {postId} = req.params;
        try{
            const post = await postModel.findById(postId);
            if(post)
            {
                console.log(post,"post is:")
                const comments = await post.comments.length;
                console.log(comments,"comment is:")
                if(comments)
                {
                    
                        return res.status(200).json({ success: true, data: comments });
                }
                else
                {
                    return res.status(400).json({ success: false, message: "Commented Error" });

                }
                
            }
            else
            {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch(e)
        {
            console.log(e,"error")
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    newComment: async (req,res)=>{
        const {postId} = req.params;
        const {user_id , commentBody} = req.body
        try{
            const post = await postModel.findById(postId);
            if(post)
            {
                const commentStatus = await post.comments.push({user_id,commentBody})
                if(commentStatus)
                {
                    post.save().then(()=>{
                        return res.status(200).json({ success: true, message: "Commented Successfully" });
                    });
                }
                else
                {
                    return res.status(400).json({ success: false, message: "Commented Error" });

                }
                
            }
            else
            {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch(e)
        {
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
}

export default postCommentsController