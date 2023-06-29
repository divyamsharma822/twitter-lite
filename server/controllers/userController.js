const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Registering User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, username, email, password } = req.body;

    // Checking if user already exist
    User.findOne({ email: email.toLowerCase() }).then((user) => {
        if (user) {
            return next(new ErrorHandler("Email already exist", 400));
        }
    });
    User.findOne({ username: username.toLowerCase() }).then((username) => {
        if (username) {
            return next(new ErrorHandler("Username already exist", 400));
        }
    });
    const user = await User.create({
        name,
        username,
        email,
        password,
    });
    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password & email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or Password", 401));
    }

    sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});
