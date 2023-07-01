const Tweet = require("../models/tweetModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get All Tweets
exports.getTweets = async (req, res, next) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;

    req.user.following = [...req.user.following, req.user._id];
    const totalDocuments = await Tweet.find({ author: { $in: req.user.following } }).countDocuments();

    const tweets = await Tweet.find({ author: { $in: req.user.following } })
        .sort({ createdAt: -1 })
        .populate({ path: "author", select: "name username -_id" })
        .skip(5 * page)
        .limit(5);

    res.status(200).json({
        success: true,
        tweets,
        totalDocuments,
    });
};

// Create Tweet
exports.createTweet = async (req, res, next) => {
    req.body.author = req.user.id;

    const newTweet = new Tweet(req.body);
    const savedTweet = await newTweet.save();

    res.status(200).json({
        success: true,
        savedTweet,
    });
};

// Edit Tweet
exports.editTweet = async (req, res, next) => {
    const { tweetId } = req.params;
    const { _id: userId } = req.user;
    console.log(req.body);

    let tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        return next(new ErrorHandler("Tweet not found", 404));
    }

    if (!tweet.author.equals(userId)) {
        return next(new ErrorHandler("You cannot update someone's tweet", 403));
    }

    tweet = await Tweet.findByIdAndUpdate({ _id: tweetId }, req.body);

    res.status(200).json({
        success: true,
        tweet,
    });
};

// Delete Tweet
exports.deleteTweet = catchAsyncErrors(async (req, res, next) => {
    const { tweetId } = req.params;
    const { _id: userId } = req.user;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        return next(new ErrorHandler("Tweet not found", 404));
    }

    if (!tweet.author.equals(userId)) {
        return next(new ErrorHandler("You cannot update someone's tweet", 403));
    } else {
        await tweet.deleteOne();
        res.status(200).json({
            success: true,
            message: "Tweet has been deleted",
        });
    }
});

// Get Followers & Following Count
exports.getDetails = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        name: req.user.name,
        username: req.user.username,
        followers: req.user.followers.length,
        following: req.user.following.length,
    });
});

// Delete Tweet
exports.deleteTweet = catchAsyncErrors(async (req, res, next) => {
    const { tweetId } = req.params;
    const { _id: userId } = req.user;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        return next(new ErrorHandler("Tweet not found", 404));
    }

    if (!tweet.author.equals(userId)) {
        return next(new ErrorHandler("You cannot update someone's tweet", 403));
    } else {
        await tweet.deleteOne();
        res.status(200).json({
            success: true,
            message: "Tweet has been deleted",
        });
    }
});
