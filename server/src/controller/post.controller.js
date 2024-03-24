import ApiError from "../helper/apiError.js";
import ApiResponse from "../helper/apiResponse.js";
import { asyncHandler } from "../helper/asyncHandler.js";
import { fileDestroy, fileUploader } from "../helper/cloudinary.js";
import { Post } from "../model/post.modal.js";
import { User } from '../model/user.modal.js'

/**
 * @param createPost
 * Create Post
 */
const createPost = asyncHandler(async (req, res, next) => {
    try {

        const { text, posted_by } = req.body;
        const post_image = req.file;
        const userId = req.user._id;

        const user = await User.findById({ _id: posted_by });

        if (!user) return next(new ApiError(403, 'User not found...'));

        if (userId !== posted_by) return next(new ApiError(403, "Unauthorized to create post"));

        const post = await Post.create({
            text,
            posted_by
        });

        if (post_image) {
            const file = await fileUploader(post_image.path);
            if (file) {
                post.post_image.url = file.secure_url;
                post.post_image.publicId = file.public_id;
            }
        }

        await post.save();

        return res.status(200).json(
            new ApiResponse(200, post, 'Post Created Successfully...')
        )

    } catch (error) {
        console.log(error.message)
        return next(new ApiError(402, "Internal Error", error));
    }
});


const getPostById = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) return next(new ApiError(401, 'id not found...'));

        const post = await Post.findById(id).populate('posted_by').exec();

        if (!post) return next(new ApiError(402, 'Post not found...'));

        return res.status(200).json(
            new ApiResponse(200, post, 'Post found Successfully...')
        )

    } catch (error) {
        console.log(error.message)
        return next(new ApiError(402, "Internal Error", error));
    }
});

const deletePost = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) return next(new ApiError(401, 'id not found...'));

        const post = await Post.findById(id);

        if (!post) return next(new ApiError(402, 'Post not found...'));

        if (post.posted_by.toString() !== req.user._id) return next(new ApiError(403, 'Unauthorized to delete post'));

        if (post.post_image.publicId) {
            await fileDestroy(post.post_image.publicId)
        }

        await Post.findByIdAndDelete(id);

        return res.status(200).json(
            new ApiResponse(200, {}, 'Deleted Successfully...')
        )

    } catch (error) {
        console.log(error.message)
        return next(new ApiError(402, "Internal Error", error));
    }
});

const likeUnlikePost = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        if (!id) return next(new ApiError(401, 'id not found...'));

        const post = await Post.findById(id);

        if (!post) return next(new ApiError(402, 'Post not found...'));

        const userLikedPost = post.likes.includes(userId);
        console.log(userLikedPost)
        if (userLikedPost) {
            await Post.updateOne({ _id: id }, { $pull: { likes: userId } });
            return res.status(200).json(
                new ApiResponse(200, post, 'Post unliked successfully...')
            )
        }else{
            post.likes.push(userId);
            await post.save();
            return res.status(200).json(
                new ApiResponse(200, post, 'Post liked successfully...')
            )
        }

    } catch (error) {
        console.log(error.message)
        return next(new ApiError(402, "Internal Error", error));
    }
});

export {
    createPost,
    getPostById,
    deletePost,
    likeUnlikePost
}