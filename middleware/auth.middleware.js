const jwt = require('jsonwebtoken');
require('dotenv').config();

//******auth*******
exports.auth = (req, res, next)=>{
    try {
        const token = req.body.token || req.cookies.token || req.headers['authorization'].replace("Bearer ", "");
        if(!token){
            return res.status(402).json({
                success:false,
                message:"token not found"
            })
        }
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET)
            req.user = data;
            next()
        } catch (error) {
            res.status(500).json({
            message:"User not verified",
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:"User token didnt fetch",
            error
        })
    }
}

//******isConsumer******
exports.isConsumer = (req, res, next)=>{
    try {

        const accountType = req.user.accountType;

        if(accountType !== "Consumer") {
            return res.status(402).json({
                message:"This route is for consumer you are not allowed"
            })
        } 

        next()

    } catch (error) {
        res.status(500).json({
            message:"Error in consumer middleware",
            error
        })
    }
}

//********isProducer******
exports.isProducer = (req, res, next)=>{
    try {

        const accountType = req.user.accountType;

        if(accountType !== "Producer") {
            return res.status(402).json({
                message:"This route is for producer you are not allowed"
            })
        } 

        next()

    } catch (error) {
        res.status(500).json({
            message:"Error in producer middleware",
            error
        })
    }
}

//*********isAdmin********
exports.isAdmin = (req, res, next)=>{
    try {

        const accountType = req.user.accountType;

        if(accountType !== "Admin") {
            return res.status(402).json({
                message:"This route is for Admin you are not allowed"
            })
        } 
        next()

    } catch (error) {
        res.status(500).json({
            message:"Error in admin middleware",
            error
        })
    }
}