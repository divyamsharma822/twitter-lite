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

exports.followProfile = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const { _id: authUserId } = req.user;

    if (userId === authUserId.toString()) {
        return next(new ErrorHandler("You cannot follow your own profile", 400));
    }

    const [authUserProfile, profileToFollow] = await Promise.all([User.findOne({ _id: authUserId }), User.findOne({ _id: userId })]);

    if (!profileToFollow) {
        return next(new ErrorHandler("Profile does not exists", 404));
    }

    if (authUserProfile.isFollowing(userId)) {
        return next(new ErrorHandler("Already Followed", 400));
    }

    profileToFollow.followers.push(authUserId);

    await Promise.all([authUserProfile.follow(userId), profileToFollow.save()]);

    return res.json({ profile: authUserProfile });
});

exports.unfollowProfile = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    const { _id: authUserId } = req.user;

    if (userId === authUserId.toString()) {
        throw new ErrorHandler(400, "You cannot unfollow your own profile");
    }

    const [authUserProfile, profileToFollow] = await Promise.all([Profile.findOne({ user: authUserId }), Profile.findOne({ user: userId })]);

    if (!profileToFollow) {
        throw new ErrorHandler(404, "Profile does not exists");
    }

    if (!authUserProfile.isFollowing(userId)) {
        throw new ErrorHandler(400, "You do not follow that profile");
    }

    profileToFollow.followers.remove(authUserId);

    await Promise.all([authUserProfile.unfollow(userId), profileToFollow.save()]);

    return res.json({ profile: authUserProfile });
});