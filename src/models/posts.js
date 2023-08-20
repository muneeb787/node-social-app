import mongoose from "mongoose";

const postsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        likes: [
            {
                user_id: {
                    type: mongoose.Schema.Types.ObjectId ,
                    required: true,
                    ref: "users",
                },
            }
        ],
        shares: [
            {
                user_id: {
                    type: mongoose.Schema.Types.ObjectId ,
                    required: true,
                    ref: "users",
                },
            }
        ],
        user_id: {
            type: mongoose.Schema.Types.ObjectId ,
            required: true,
            ref: "users",
        },
        comments: [
            {
                user_id: {
                    type: mongoose.Schema.Types.ObjectId ,
                    required: true,
                    ref: "users",
                },
                commentBody: {
                    type: String,
                },
                CommentTime: {
                    type: Date,
                    default: Date.now()
                }
            },
        ],
    },
    {timestamps: true}
);

const postModel = mongoose.model("userPosts",postsSchema);

export default postModel;
