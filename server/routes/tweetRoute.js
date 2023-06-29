const express = require("express");
const { createTweet, editTweet, deleteTweet, getTweets, getDetails } = require("../controllers/tweetController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/feed").get(isAuthenticatedUser, getTweets);
router.route("/create").post(isAuthenticatedUser, createTweet);
router.route("/edit/:tweetId").patch(isAuthenticatedUser, editTweet);
router.route("/delete/:tweetId").delete(isAuthenticatedUser, deleteTweet);
router.route("/details").get(isAuthenticatedUser, getDetails);

module.exports = router;
