const pool = require('../database/pg.databse');
const { ApiError } = require('../utils/ApiError.utils');
const bcrypt = require('bcrypt');
const { ApiResponse } = require('../utils/ApiResponse.utils');


//************login user************
exports.loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            throw new ApiError(400, "Fill all the details");
        }

        //DB call
        const query = "SELECT * FROM users WHERE email = $1"
        const values = [email];
        const user = await pool.query(query, values);
        console.log(user)
        if(!user){
            throw new ApiError(400, "User Does not exits");
        }

        if(await bcrypt.compare(password, user.user_password)){
            const playload ={
                id: user.user_id,
                email: user.email,
                accountType: user.account_type
            }
            const token = jwt.sign(playload, process.env.JWT_SECRET, {expiresIn:"2h",});

            user.token = token;
            user.password = undefined;

            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            return res.cookie("token", token, options).status(200).json(
                new ApiResponse(200, "User Logined", user)
            )

        }else{
            throw new ApiError(400, "Incorrect password")
        }

    } catch (error) {
        throw new ApiError(500, error.message, error);
    }
}

//************signup user***********
exports.signupUser = async (req, res) => {
    try {
        const {name, address, email, password, confirmPassword, accountType} = req.body;
        if(!name || !address || !email || !password || !accountType || ! confirmPassword){
            throw new ApiError(400, "Fill all the details");
        }

        if(password !== confirmPassword){
            throw new ApiError(400, "Password not matched");
        }

        //validation
        const queryForUserExits = "SELECT email FROM users WHERE email = $1 AND account_type = $2";
        const valuesForUserExits = [email, accountType]
        const userExits = await pool.query(queryForUserExits, valuesForUserExits);
        if(userExits){
            throw new ApiError(400, "User already extis");
        }

        //insert in DB
        password = bcrypt.hash(password, process.env.HASHING_ROUND);
    
        const query = "INSERT INTO users (user_name, user_address, account_type, email, user_password) VALUES ($1, $2, $3, $4, $5);";
        const values = [name, address, accountType, email, password];
        const createUser = await pool.query(query, values);

        return res.status(200).json(
            new ApiResponse(200, "User signup successfull")
        )

        
    } catch (error) {
        throw new ApiError(500, error.message, error);
    }
}
