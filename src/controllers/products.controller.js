import { getConnection, sql, queries } from '../database'

export const getProducts = async (req, res) => {
    try {
        //Creating query for database.
        const dbQuery = queries.getAllProducts;

        //Passing query for the function implemented in connection.js file
        const pool = await getConnection();
        const initialDbResponse = await pool.query(dbQuery);
        
        //We use [0] to get the final response array inside. 
        const finalResponse = initialDbResponse.recordsets[0];
        res.status(200).json(finalResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const createProduct = async (req, res) => {
    let { name, description, quantity } = req.body;

    if(!name || !description || !quantity){
        return res.status(400).json({msg: 'Bad request. Fill all fields.'});
    }

    const postObject = { 
        name, 
        description, 
        quantity
    }

    try {
        //Creating query for database.
        const dbQuery = queries.postProduct;

        const pool = await getConnection();

        // we add 1 input to the query for every parameter we use
        await pool
        .input('name', sql.VarChar, name)
        .input('description', sql.Text, description)
        .input('quantity', sql.Int, quantity)
        .query(dbQuery);

        res.status(200).json({ msg: 'Successfully added', postedProduct: postObject});
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        //Creating query for database.
        const dbQuery = queries.getProductById;
        const pool = await getConnection();

        const initialDbResponse = await pool
        .input('id', id)
        .query(dbQuery);
        
        //We use [0] twice to get the final response object inside. 
        const finalResponse = initialDbResponse.recordsets[0][0];
        res.status(200).json(finalResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        //Creating query for database.
        const dbQuery = queries.deleteProductById;
        const pool = await getConnection();

        const initialDbResponse = await pool
        .input('id', id)
        .query(dbQuery);
        
        res.status(200).json({ msg: "Product succesfully deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const getTotalProducts = async (req, res) => {

    try {
        //Creating query for database.
        const dbQuery = queries.getTotalProducts;
        const pool = await getConnection();

        const initialDbResponse = await pool
        .query(dbQuery);

        const finalResponse = initialDbResponse.recordsets[0];

        res.sendStatus(204).json(finalResponse)
        /* res.status(200).json({ msg: "Product succesfully deleted", initialDbResponse}); */
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity } = req.body;

    try {
        //Creating query for database.
        const dbQuery = queries.updateProduct;

        const pool = await getConnection();

        // we add 1 input to the query for every parameter we use
        await pool
        .input('name', sql.VarChar, name)
        .input('description', sql.Text, description)
        .input('quantity', sql.Int, quantity)
        .input('id', sql.Int, id)
        .query(dbQuery);

        res.status(200).json({ msg: 'Successfully updated product', postedProduct: {name, description, quantity}});
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}