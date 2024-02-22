const pool = require('../database/pg.databse');
const { ApiError } = require('../utils/ApiError.utils');

//signup user
exports.signupUser = async (req, res) => {
    try {
        const {name, address, email, password, confirmPassword, accountType} = req.body;
        if(!name || !address || !email || !password || !accountType || ! confirmPassword){
            throw new ApiError(400, "Fill all the details");
        }

        if(password !== confirmPassword){
            throw new ApiError(400, "Password not matched");
        }

        const queryForUserExits = "SELECT email FROM users WHERE email = $1 AND account_type = $2";
        const userExits = await pool.query()

        
    } catch (error) {
        throw new ApiError(500, error.message, error);
    }
}
