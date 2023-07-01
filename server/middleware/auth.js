const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resources", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET,(err,decodedTOken) => {
        if(err){
            return next(new ErrorHandler("Please Login to access this resources", 401));
        }
        return decodedTOken;
    });

    req.user = await userModel.findById(decodedData.id);

    next();
});
