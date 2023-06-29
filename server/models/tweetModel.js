const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true,"required"],
        },
        description: {
            type: String,
            required: [true,"required"],
            max: 280,
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

tweetSchema.methods.like = function (userId) {
    if (!this.likes.some((id) => id.equals(userId))) {
        this.likes.push(userId);
        return this.save();
    }
    return Promise.resolve(this);
};

tweetSchema.methods.unlike = function (userId) {
    if (this.likes.some((id) => id.equals(userId))) {
        this.likes.remove(userId);
        return this.save();
    }
    return Promise.resolve(this);
};

module.exports = mongoose.model("Tweet", tweetSchema);
