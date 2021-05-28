module.exports = app => {
    const product = require("../controllers/product.controller.js");
  
    // Create a new Product
    app.post("/product", product.create);
  
    // Retrieve all Product
    app.get("/product", product.findAll);
  
    // Retrieve a single Product with ProductID
    app.get("/product/:ProductID", product.findOne);
  
    // Update a Product with ProductID
    app.put("/product/:ProductID", product.update);
  
    // Delete a Product with ProductID
    app.delete("/product/:ProductID", product.delete);
  
    // Create a new Product
    app.delete("/product", product.deleteAll);
  };