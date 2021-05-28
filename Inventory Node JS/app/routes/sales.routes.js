module.exports = app => {
    const sales = require("../controllers/sales.controller.js");
  
    // Create a new Sales
    app.post("/sales", sales.create);
  
    // Retrieve all Sales
    app.get("/sales", sales.findAll);
  
    // Retrieve a single Sales with SalesID
    app.get("/sales/:SalesID", sales.findOne);
  
    // Update a Sales with SalesID
    app.put("/sales/:SalesID", sales.update);
  
    // Delete a Sales with SalesID
    app.delete("/sales/:SalesID", sales.delete);
  
    // Create a new Sales
    app.delete("/sales", sales.deleteAll);
  };