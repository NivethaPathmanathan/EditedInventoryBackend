module.exports = app => {
    const purchase = require("../controllers/purchase.controller.js");
  
    // Create a new Purchase
    app.post("/purchase", purchase.create);
  
    // Retrieve all Purchase
    app.get("/purchase", purchase.findAll);
  
    // Retrieve a single Purchase with PurchaseID
    app.get("/purchase/:PurchaseID", purchase.findOne);
  
    // Update a Purchase with PurchaseID
    app.put("/purchase/:PurchaseID", purchase.update);
  
    // Delete a Purchase with PurchaseID
    app.delete("/purchase/:PurchaseID", purchase.delete);
  
    // Create a new Purchase
    app.delete("/purchase", purchase.deleteAll);
  };