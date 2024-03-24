import { Schema, model } from "mongoose";

const postSchema = new Schema({
    posted_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
    },
    post_image: {
        url: {
            type: String
        },
        publicId: {
            type: String
        }
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    replies: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                required: true
            },
            userProfilePic: {
                type: String
            },
            username: {
                type: String
            }
        },
    ]
}, {
    timestamps: true
});

export const Post = model('Post', postSchema);
