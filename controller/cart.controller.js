const pool = require("../database/pg.databse");

//insert product in cart
exports.insertProductInCart = async (req, res) => {
    try {
        const {productID, quantity} = req.body;
        const userID = req.user.id;
        if(!productID || !quantity || !userID){
            return res.status(400).json({
                success:false,
                message:"Fill all the details"
            })
        }

        const query = "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)";
        const values = [userID, productID, quantity];
        const cart = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"product added to cart",
            cart:cart.rows
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in inserting product in cart",
            error
        })
    }
}

//remove product from cart
exports.removeProductFromCart = async (req, res) => {
    try {
        const cartID = req.params;
        if(!cartID){
            return res.status(400).json({
                success:false,
                message:"cart not found"
            })
        }

        const query = "DELETE FROM cart WHERE cart_id = $1";
        const values = [cartID];
        await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"product remove from cart",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in removing product from cart",
            error
        })
    }
}