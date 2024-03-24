import ApiError from '../helper/apiError.js';
import ApiResponse from '../helper/apiResponse.js';
import { asyncHandler } from '../helper/asyncHandler.js';
import { User } from '../model/user.modal.js'


const sendOtp = asyncHandler(async () => {

})

const signup = asyncHandler(async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        if ([name, email, username, password].some(item => item.trim() === '')) {
            return next(new ApiError(402, "All field Mendatory..."));
        }

        const user = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (user) {
            return next(new ApiError(402, "User Already Exist..."));
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
})

const followUnFollow = asyncHandler(async (req, res) => {
    try {
        const { id } = req.query;
        const { user } = req.body;

        const userUpdate = await User.findById(id);
        console.log(user)
        console.log(userUpdate)

        if (!user) return next(new ApiError(402, "User is not find please signup.."));

    } catch (error) {
        return next(new ApiError(402, "Internal Error", error));
    }
})

export {
    sendOtp,
    signup,
    login,
    logout,
    followUnFollow
}