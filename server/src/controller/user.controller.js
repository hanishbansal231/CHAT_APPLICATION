import ApiError from '../helper/apiError.js';
import ApiResponse from '../helper/apiResponse.js';
import { asyncHandler } from '../helper/asyncHandler.js';
import { fileDestroy, fileUploader } from '../helper/cloudinary.js';
import { Otp } from '../model/otp.js';
import { User } from '../model/user.modal.js'
import otpGenerator from 'otp-generator';
import crypto from 'crypto';
import { config } from 'dotenv';
import sendEmail from '../helper/emailSender.js';
config();


/**
 * @param SEND OTP
 * OTP VERIFICATION FUNCTION
 */
const sendOtp = asyncHandler(async (req, res, next) => {
    const { email, username, name } = req.body;

    if (!email || !name) return next(new ApiError(402, "Email is mendatory..."));

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (user) return next(new ApiError(402, "User Already Exist..."));

    var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    const result = await Otp.findOne({ otp });

    while (result) {
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
    }

    const otpPayload = { email, otp, name };
    const otpBody = await Otp.create(otpPayload);

    return res.status(200).json(
        new ApiResponse(200, otpBody, 'Otp Send Successfully...')
    )

})


/**
 * @param SIGNUP
 * SIGNUP FUNCTION
 */
const signup = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, username, password, otp } = req.body;

        console.log(req.body)
        if ([name, email, username, password].some(item => item.trim() === '')) {
            return next(new ApiError(402, "All field Mendatory..."));
        }

        const user = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (user) {
            return next(new ApiError(402, "User Already Exist..."));
        }

        const otpFind = await Otp.findOne({ email }).sort({ createdAt: -1 }).limit(1);

        if (otpFind.otp.length === 0) {
            return next(new ApiError("The OTP is not valid", 402));
        } else if (otp !== otpFind.otp) {
            return next(new ApiError("The OTP is not valid", 402));
        }


        const newUser = new User({
            name,
            email,
            username,
            password
        });

        if (!newUser) {
            return next(new ApiError(402, "User is not created please try again..."));
        }

        await newUser.save();

        return res.status(200).json(
            new ApiResponse(200, newUser, 'Login Successfully...')
        )

    } catch (error) {
        console.log(error);
        return next(new ApiError(402, "Internal Error", error));
    }
});


/**
 * @param LOGIN
 * LOGIN FUNCTION
 */
const login = asyncHandler(async (req, res, next) => {
    try {

        const { username, email, password } = req.body;

        if (!password || !(username || email)) {
            return next(new ApiError(402, "All field Mendatory..."));
        }

        const user = await User.findOne({ email }) || await User.findOne({ username });

        if (!user) return next(new ApiError(402, "User is not find please signup.."));

        const isPassword = await user.comparePassword(password);

        if (!isPassword) return next(new ApiError(402, "Password is wrong please try again.."));

        const token = user.generateAccessToken();
        if (token) user.access_token = token;
        else return next(new ApiError(402, "Token is not generated.."));

        return res.status(200).json(
            new ApiResponse(200, user, 'Login Successfully...')
        )

    } catch (error) {
        return next(new ApiError(402, "Internal Error", error));
    }
});

/**
 * @param logout
 * LOGOUT FUNCTION
 */
const logout = asyncHandler(async (req, res) => {
    try {

        res.cookie('token', "", {
            maxAge: 1
        });

        return res.status(200).json(
            new ApiResponse(200, [], 'Logout...')
        )

    } catch (error) {
        return next(new ApiError(402, "Internal Error", error));
    }
});

/**
 * @param changePassword
 * CHANGE PASSWORD FUNCTION
 */
const changePassword = asyncHandler(async (req, res, next) => {
    try {
        const { newPassword, oldPassword } = req.body;
        const user = req.user;

        if (!newPassword || !oldPassword) {
            return next(new ApiError(403, 'All field Mendatory...'));
        }

        const findUser = await User.findById({ _id: user._id });

        if (!findUser) return next(new ApiError(402, "User is not find please signup.."));

        const isPassword = await findUser.comparePassword(oldPassword);

        console.log(isPassword);

        if (!isPassword) return next(new ApiError(402, "Password is wrong please try again.."));

        findUser.password = newPassword;

        await findUser.save();

        return res.status(200).json(
            new ApiResponse(200, findUser, 'Change Password Successfully...')
        )

    } catch (error) {
        console.log(error.message)
        return next(new ApiError(402, "Internal Error", error));
    }
})

/**
 * @param followUnFollow
 * FOLLOW AND UNFOLLOW FUNCTION
 * 
 */
const followUnFollow = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const updateUser = await User.findById(id);
        const currentUser = await User.findById(user._id);

        if (id === user._id) return next(new ApiError(403, 'You cannot follow/unfollow yourself...'));

        if (!updateUser || !currentUser) return next(new ApiError(402, "User is not find..."));

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            await User.findByIdAndUpdate(user._id, { $pull: { following: id } });
            await User.findByIdAndUpdate(id, { $pull: { followers: id } });
        } else {
            await User.findByIdAndUpdate(user._id, { $push: { following: id } });
            await User.findByIdAndUpdate(id, { $push: { followers: id } });
        }

        return res.status(200).json(
            new ApiResponse(200, currentUser, 'Change Password Successfully...')
        )

    } catch (error) {
        console.log(error.message)
        return next(new ApiError(402, "Internal Error", error));
    }
});


/**
 * @param updateUser
 * UPDATE USER FUNCTION
 * 
 */
const updateUser = asyncHandler(async (req, res, next) => {
    try {
        const { name, email, username, bio } = req.body;
        const profilePicture = req.file?.path;
        const userId = req.user._id;

        const user = await User.findById({ _id: userId });

        if (!user) return next(new ApiError(402, "User is not find..."));

        if (profilePicture) {

            if (user.profile_picture.publicId) {
                await fileDestroy(user.profile_picture.publicId)
                user.profile_picture.publicId = '';
                user.profile_picture.url = '';
            }

            const file = await fileUploader(profilePicture);
            if (file) {
                user.profile_picture.publicId = file.public_id;
                user.profile_picture.url = file.secure_url;
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;


        await user.save();

        return res.status(200).json(
            new ApiResponse(200, user, 'Change Password Successfully...')
        )


    } catch (error) {
        console.log(error.message)
        return next(new ApiError(402, "Internal Error", error));
    }
});


/**
 * @param getUserById
 * GET USER FUNCTION
 * 
 */

const getUserById = asyncHandler(async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!id) return next(new ApiError(403, 'Id not found...'));

        const user = await User.findById(id);

        if (!user) return next(new ApiError(402, "User is not find..."));

        return res.status(200).json(
            new ApiResponse(200, user, 'Change Password Successfully...')
        )

    } catch (error) {
        console.log(error.message)
        return next(new ApiError(402, "Internal Error", error));
    }
});

const forgotPasswordToken = asyncHandler(async (req, res, next) => {
    try {
        const { email, username } = req.body;

        if (!(email || username)) return next(new ApiError(403, 'All field Mendatory...'));

        const user = await User.findOne({ email: email }) || await User.findOne({ username: username });

        if (!user) return next(new ApiError(402, "User is not find..."));

        const forgotToken = await user.generatePasswordResetToken();
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${forgotToken}`;

        try {

            await sendEmail(user.email, 'Forgot Password...', resetPasswordUrl);

            await user.save();
            return res.status(200).json(
                new ApiResponse(200, {}, 'Forgot Password Successfully...')
            )
        } catch (error) {
            user.forgotPasswordExpiry = undefined;
            user.forgotPasswordToken = undefined;
            console.log(error.message)
            return next(new ApiError(402, "Internal Error", error));
        }

    } catch (error) {
        console.log(error.message);
        return next(new ApiError(402, "Internal Error", error));
    }
});

const resetPassword = asyncHandler(async (req, res, next) => {
    try {

        const { forgotToken, newPassword, comfirmPassword } = req.body;

        if (!forgotToken || !newPassword || !comfirmPassword) return next(new ApiError(403, 'All field Mendatory...'));

        const forgotPasswordToken = crypto
            .createHash('sha256')
            .update(forgotToken)
            .digest('hex');

            console.log(forgotPasswordToken)

        const user = await User.findOne({
            forgotPasswordToken:forgotToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) return next(new ApiError(402, "User is not find..."));

        if(newPassword !== comfirmPassword) return next(new ApiError(403, 'password not match...'));

        user.password = newPassword;
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        return res.status(200).json(
            new ApiResponse(200, {}, 'Forgot Password Successfully...')
        )

    } catch (error) {
        console.log(error.message);
        return next(new ApiError(402, "Internal Error", error));
    }
})

export {
    sendOtp,
    signup,
    login,
    logout,
    followUnFollow,
    changePassword,
    updateUser,
    getUserById,
    forgotPasswordToken,
    resetPassword
}