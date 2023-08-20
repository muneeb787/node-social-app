import postModel from "../../models/posts.js";


const postLikesController = {
    likes: async (req,res)=>{
        const {postId} = req.params;
        const {user_id} = req.body
        console.log(user_id);
        try{
            const post = await postModel.findById(postId);
            if(post)
            {
                const commentStatus = await post.likes.push({user_id})
                if(commentStatus)
                {
                    post.save().then(()=>{
                        return res.status(200).json({ success: true, message: "Liked Successfully" });
                    });
                }
                else
                {
                    return res.status(400).json({ success: false, message: "Liking Error" });

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
    }
}

export default postLikesController