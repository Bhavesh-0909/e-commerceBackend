const pool = require("../database/pg.databse");

//*******create a category*********
exports.createCategory = async(req, res) => {
    try {
        const {name, desc} = req.body;
        if(!name || !desc){
            return res.status(400).json({
                success:false,
                message:"Fill all the details"
            })
        }

        const query = "INSERT INTO categories (category_name, category_desc) VALUES($1, $2)";
        const values = [name, desc];
        const category = await pool.query(query, values);

        return res.status(200).json({
            success:true,
            message:"category created",
            category:category.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in creating category",
            error
        })
    }
}

//*******get all category**********
exports.getAllCategory = async(req, res) => {
    try {
        
        const query = "SELECT category_id, category_name FROM categories";
        const categories = await pool.query(query);

        return res.status(200).json({
            success:true,
            message:"List of all categories",
            categories:categories.rows
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in geting all category",
            error
        })
    }
}