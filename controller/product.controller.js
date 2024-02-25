const  pool = require('../database/pg.databse')
//create product 
exports.createProduct = async (req, res) => {
    try {
        const {productName, productDesc, productPrice, categoryID, stock} = req.body;
        const sellerID = req.user.id;
        if(!productName || !productDesc || !productPrice || !categoryID || !stock || !sellerID){
            return res.status(400).json({
                success:false,
                message:"Fill all the details"
            })
        }

        const query = "INSERT INTO products(seller_id, product_name, price, product_description, stock, category_id) VALUES ($1, $2, $3, $4, $5, $6)"
        const values = [sellerID, productName, productPrice, productDesc, stock, categoryID];
        const product = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"Product created",
            product: product.rows
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in creating product",
            error
        })
    }
}

//get all product from category ID
exports.getAllProduct = async (req, res) => {
    try {
        const categoryID = req.params;
        if(!categoryID){
            return res.status.json({
                success:false,
                message:"Category ID not Found"
            })
        }

        const query = "SELECT * FROM products WHERE category_id = $1";
        const values = [categoryID];
        const products = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"ALL products of same category",
            products:products.rows
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in get all the products from category ID",
            error
        })
    }
}

//get all details of product by Id
exports.getDetailsOfProduct = async (req, res) => {
    try {
        const productID = req.params;
        if(!productID){
            return res.status(400).json({
                success:false,
                message:"Product ID not found"
            })
        }

        const query = "SELECT * FROM products WHERE product_id = $1"
        const values = [productID];

        const product = await pool.query(query, values)

        return res.status(200).json({
            success:true,
            message:"All details of product",
            product:product.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in geting details of product",
            error
        })
    }
}

//updating stock of product 
exports.updatingProduct = async (req, res) => {
    try {
        const {stock , productID} = req.body;
        if(!stock || !productID){
            return res.status(400).json({
                success:false,
                message:"Details not found"
            })
        }

        const query = "UPDATE products SET stock = $1 WHERE product_id = $2";
        const values = [stock, productID];
        const updatedProduct = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"Product details updated",
            product:updatedProduct.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in updating product",
            error
        })
    }
}

//delete a product from ID
exports.deleteProduct = async (req, res) => {
    try {
        const {productID} = req.body;
        if(!productID){
            return res.status(400).json({
                success:false,
                message:"Product Id not found"
            })
        }

        const query = "DELETE FROM products WHERE product_id = $1";
        const values = [productID];
        await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in deleting product",
            error
        })
    }
}