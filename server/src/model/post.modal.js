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
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [
        {
           userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required:true
           },
           text:{
            type: String,
            required:true
           },
           userProfilePic:{
            type:String
           },
           username:{
            type:string
           }
        },
    ]
}, {
    timestamps: true
});

export const Post = model('Post', postSchema);
