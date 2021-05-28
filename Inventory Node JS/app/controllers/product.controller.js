const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Product
  const product = new Product({
    ProductId: req.body.ProductId,
    ProductName: req.body.ProductName,
    BrandName: req.body.BrandName,
    Label: req.body.Label
  });

  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving products."
          });
        else res.send(data);
      });
};

// Find a single Product with a ProductID
exports.findOne = (req, res) => {
    Product.findById(req.params.ProductID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Product with ProductID ${req.params.ProductID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Product with ProductID " + req.params.ProductID
            });
          }
        } else res.send(data);
      });
};

// Update a Product identified by the ProductID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
}

Product.updateById(
  req.params.ProductID,
  new Product(req.body),
  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with ProductId ${req.params.ProductID}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Product with ProductId " + req.params.ProductID
        });
      }
    } else res.send(data);
  }
);
};

// Delete a Product with the specified PurchaseID in the request
exports.delete = (req, res) => {
    Product.remove(req.params.ProductID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Product with ProductId ${req.params.ProductID}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Product with ProductId " + req.params.ProductID
            });
          }
        } else res.send({ message: `Product was deleted successfully!` });
      });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all products."
          });
        else res.send({ message: `All Producrs were deleted successfully!` });
      });
};