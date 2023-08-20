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
        likes: {
            type: Number,
            default: 0,
        },
        shares: {
            type: Number,
            default: 0,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId ,
            required: true,
            ref: "users",
            select: "password"
        },
        comments: [
            {
                commentBody: {
                    type: String,
                }
            },
        ],
    },
    {timestamps: true}
);

const postModel = mongoose.model("userPosts",postsSchema);

export default postModel;
