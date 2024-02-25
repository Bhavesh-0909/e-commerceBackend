const pool = require("../database/pg.databse");

//get all products in cart of consumer
exports.getAllProducts = async (req, res) => {
    try {
        const userID = req.user.id;
        if(!userID){
            return res.status(400).json({
                success:false,
                message:"Please Log in"
            })
        }

        const query = "SELECT * FROM cart WHERE user_id = $1";
        const values = [userID];
        const cart = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"all products of cart",
            cart:cart.rows
        })
    } catch (error) {
        
    }
}
//insert product in cart
exports.insertProductInCart = async (req, res) => {
    try {
        const productID = req.params.id
        const {quantity, price} = req.body;
        const userID = req.user.id;
        if(!productID || !quantity || !userID || !price){
            return res.status(400).json({
                success:false,
                message:"Fill all the details"
            })
        }

        const total_price = quantity * price

        const query = "INSERT INTO cart (user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4)";
        const values = [userID, productID, quantity, total_price];
        const cart = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"product added to cart",
            cart:cart.rows[0]
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
        const cartID = req.params.id;
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

//updating product quantity in cart 
exports.updateCart = async (req, res) => {
    try {
        const productID = req.params.id
        const {quantity, price} = req.body;
        const userID = req.user.id;
        if(!productID || !quantity || !userID){
            return res.status(400).json({
                success:false,
                message:"Can't fetch your data"
            })
        }

        const total_price = quantity * price;

        const query = "UPDATE cart SET quantity = $1, total_price = $2 WHERE user_id = $3 AND product_id = $4";
        const values = [quantity, total_price, userID, productID];
        const updateCart = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"cart updated",
            cart:updateCart.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in updating product quantity in cart",
            error
        })
    }
}