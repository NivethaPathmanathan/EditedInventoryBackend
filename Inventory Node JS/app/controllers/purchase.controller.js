const Purchase = require("../models/purchase.model.js");

// Create and Save a new Purchase
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Purchase
  const purchase = new Purchase({
    PurchaseId: req.body.PurchaseId,
    PurchaseDate: req.body.PurchaseDate,
    NoReceived: req.body.NoReceived,
    SupplierName: req.body.SupplierName,
    ProductId: req.body.ProductId
  });

  // Save Purchase in the database
  Purchase.create(purchase, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Purchase."
      });
    else res.send(data);
  });
};

// Retrieve all Purchase from the database.
exports.findAll = (req, res) => {
  Purchase.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving purchase."
          });
        else res.send(data);
      });
};

// Find a single Purchase with a PurchaseID
exports.findOne = (req, res) => {
  Purchase.findById(req.params.PurchaseID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Purchase with PurchaseID ${req.params.PurchaseID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Purchase with PurchaseId " + req.params.PurchaseID
            });
          }
        } else res.send(data);
      });
};

// Update a Purchase identified by the PurchaseID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
}

Purchase.updateById(
  req.params.PurchaseID,
  new Purchase(req.body),
  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Purchase with id ${req.params.PurchaseID}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Purchase with id " + req.params.PurchaseID
        });
      }
    } else res.send(data);
  }
);
};

// Delete a Purchase with the specified PurchaseId in the request
exports.delete = (req, res) => {
    Purchase.remove(req.params.PurchaseID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Purchase with id ${req.params.PurchaseID}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Purchase with id " + req.params.PurchaseID
            });
          }
        } else res.send({ message: `Purchase was deleted successfully!` });
      });
};

// Delete all Purchase from the database.
exports.deleteAll = (req, res) => {
    Purchase.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Purchase."
          });
        else res.send({ message: `All Purchase were deleted successfully!` });
      });
};