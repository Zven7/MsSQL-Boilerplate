export const queries = {
    getAllProducts: "SELECT * FROM Products",
    postProduct: "INSERT INTO Products (name, description, quantity) VALUES (@name, @description, @quantity)",
    getProductById: "SELECT * FROM Products WHERE id = @id",
    deleteProductById: "DELETE FROM Products WHERE id = @id",
    getTotalProducts: "SELECT COUNT(*) FROM Products",
    updateProduct: "UPDATE Products SET name = @name, description = @description, quantity = @quantity WHERE id = @id"
}