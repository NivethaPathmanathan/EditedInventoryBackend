const Sales = require("../models/sales.model.js");

// Create and Save a new Sales
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Sales
  const sales = new Sales({
    SalesId: req.body.SalesId,
    SalesDate: req.body.SalesDate,
    NoOfSales: req.body.NoOfSales,
    CustomerName: req.body.CustomerName,
    ProductId: req.body.ProductId
  });

  // Save Sales in the database
  Sales.create(sales, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sales."
      });
    else res.send(data);
  });
};

// Retrieve all Sales from the database.
exports.findAll = (req, res) => {
  Sales.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving sales."
          });
        else res.send(data);
      });
};

// Find a single Sales with a SalesID
exports.findOne = (req, res) => {
  Sales.findById(req.params.SalesID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Sales with id ${req.params.SalesID}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Sales with id " + req.params.SalesID
            });
          }
        } else res.send(data);
      });
};

// Update a Sales identified by the SalesID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
}

Sales.updateById(
  req.params.SalesID,
  new Sales(req.body),
  (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Sales with id ${req.params.SalesID}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Sales with id " + req.params.SalesID
        });
      }
    } else res.send(data);
  }
);
};

// Delete a Sales with the specified SalesId in the request
exports.delete = (req, res) => {
    Sales.remove(req.params.SalesID, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Sales with id ${req.params.SalesID}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Sales with id " + req.params.SalesID
            });
          }
        } else res.send({ message: `Sales was deleted successfully!` });
      });
};

// Delete all Sales from the database.
exports.deleteAll = (req, res) => {
    Sales.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Sales."
          });
        else res.send({ message: `All Sales were deleted successfully!` });
      });
};