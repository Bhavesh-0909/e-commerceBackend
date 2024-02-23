const pool = require('../database/pg.databse');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')


//************login user************
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fill all the details"
            });
        }

        // DB call
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const user = await pool.query(query, values);
        console.log(user.rows);
        if (user.rows.length === 0) {
            return res.status(400).json({
                success:false,
                message:"user does not extis"
            })
        }

        if (await bcrypt.compare(password, user.rows[0].user_password)) {
            const payload = {
                id: user.rows[0].user_id,
                email: user.rows[0].email,
                accountType: user.rows[0].account_type
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            user.rows[0].user_password = undefined

            return res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User Logged in",
                user: user.rows[0]
            });

        } else {
            return res.status(400).json({
                success:false,
                message:"Incorrect password`"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

//************signup user***********
exports.signupUser = async (req, res) => {
    try {
        const { name, address, email, password, confirmPassword, accountType } = req.body;
        if (!name || !address || !email || !password || !accountType || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Fill all the details"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        //user already exists
        const queryForUserExists = "SELECT email FROM users WHERE email = $1 AND account_type = $2";
        const valuesForUserExists = [email, accountType];
        const userExists = await pool.query(queryForUserExists, valuesForUserExists);
        if (userExists.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASHING_ROUND));
        // Insert into DB
        const query = "INSERT INTO users (user_name, user_address, account_type, email, user_password) VALUES ($1, $2, $3, $4, $5);";
        const values = [name, address, accountType, email, hashedPassword];
        await pool.query(query, values);

        return res.status(200).json({
            success: true,
            message: "User created"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Signup failed",
            error: error.message
        });
    }
};
