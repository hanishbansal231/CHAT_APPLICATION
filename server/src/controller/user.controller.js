import ApiError from '../helper/apiError.js';
import ApiResponse from '../helper/apiResponse.js';
import { asyncHandler } from '../helper/asyncHandler.js';
import { Otp } from '../model/otp.js';
import { User } from '../model/user.modal.js'
import otpGenerator from 'otp-generator';

const sendOtp = asyncHandler(async (req, res, next) => {
    const { email, username } = req.body;

    if (!email) return next(new ApiError(402, "Email is mendatory..."));

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

    const otpPayload = { email, otp };
    const otpBody = await Otp.create(otpPayload);

    return res.status(200).json(
        new ApiResponse(200, otpBody, 'Otp Send Successfully...')
    )

})

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

const followUnFollow = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const userUpdate = await User.findById(id);

        if (!userUpdate) return next(new ApiError(402, "User is not find please signup.."));

    } catch (error) {
        console.log(error.message)
        return next(new ApiError(402, "Internal Error", error));
    }
})

export {
    sendOtp,
    signup,
    login,
    logout,
    followUnFollow,
    changePassword
}