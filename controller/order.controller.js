const { query } = require('express');
const pool = require('../database/pg.databse')

//create a product
exports.createOrder = async (req, res) =>{
    try {
        const productID = req.params.id;
        const userID = req.user.id;
        if(!userID || !product_id || !quantity){
            return res.status(400).json({
                success:false,
                message:"Details not found"
            })
        }

        const queryCart = "Select * FROM cart WHERE user_id = $1 AND product_id = $2";
        const valuesCart = [userID, productID];
        const cart = await pool.query(queryCart, valuesCart);
        if(cart.rowCount === 0){
            return res.status(400).json({
                success:false,
                message:"Product not in cart"
            })
        }

        const quantity = cart.rows[0].quantity;
        const price = cart.rows[0].total_price;
        const order_status = "Processing";

        const query = "INSERT INTO order_desc (customer_id, product_id, quantity, order_status, total_price) VALUES ($1, $2, $3, $4, $5)";
        const values = [userID, productID, quantity, order_status, price];
        const order = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"order created",
            order:order
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in creating order",
            error
        })
    }
}

//get orderHistory of user
exports.getOrderHistory = async (req, res) => {
    try {
        const userID = req.user.id;
        if(!userID){
            return res.status(400).json({
                success:false,
                message:"Please login"
            })
        }

        const query = "SELECT * FROM order_desc WHERE user_id = $1";
        const values = [userID];
        const orderHistory = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"order History of user",
            order:orderHistory.rows
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in geting order history",
            error
        })
    }
}

//get order desc by order id
exports.getOrder = async (req, res) => {
    try {
        const orderID = req.params.id;
        if(!orderID){
            return res.status(400).json({
                success:false,
                message:"orderId not fetched"
            })
        }

        const query = "SELECT * FROM order_desc WHERE order_id = $1";
        const values = [orderID];
        const order = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"Details of order",
            order:order.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in geting order history",
            error
        })
    }
}

//update order desc
exports.updateOrder = async (req, res) => {
    try {
        const {order_status} = req.body
        const orderID = req.params.id;
        if(!orderID){
            return res.status(400).json({
                success:false,
                message:"orderId not fetched"
            })
        }

        const query = "UPDATE order_desc SET order_status = $1 WHERE order_id = $2";
        const values = [order_status, orderID];
        const order = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"Order update",
            order:order.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in upadting order",
            error
        })
    }
}

//delete order
exports.deleteOrder = async (req, res) => {
    try {
        const orderID = req.params.id;
        if(!orderID){
            return res.status(400).json({
                success:false,
                message:"orderId not fetched"
            })
        }

        const query = "DELETE FROM order_desc WHERE order_id = $1";
        const values = [orderID];
        await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"Order deleted",
        }) 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Deleting order",
            error
        })
    }
}
