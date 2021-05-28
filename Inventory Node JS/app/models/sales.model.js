const sql = require("./db.js");

// constructor
const Sales = function(sales) {
  this.SalesId = sales.SalesId;
  this.SalesDate = sales.SalesDate;
  this.NoOfSales = sales.NoOfSales;
  this.CustomerName = sales.CustomerName;
  this.ProductId = sales.ProductId;
};

Sales.create = (newSales, result) => {
  sql.query("INSERT INTO sales SET ?", newSales, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created sales: ", { id: res.insertId, ...newSales });
    result(null, { id: res.insertId, ...newSales });
  });
};

Sales.findById = (SalesID, result) => {
  sql.query(`SELECT * FROM sales WHERE id = ${SalesID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found sales: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Sales with the id
    result({ kind: "not_found" }, null);
  });
};

Sales.getAll = result => {
  sql.query("SELECT * FROM sales", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Sales: ", res);
    result(null, res);
  });
};

Sales.updateById = (id, sales, result) => {
  sql.query(
    "UPDATE sales SET SalesDate = ?, NoOfSales = ?, CustomerName = ? WHERE id = ?",
    [sales.SalesDate, sales.NoOfSales, sales.CustomerName, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Sales with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated sales: ", { id: id, ...sales });
      result(null, { id: id, ...sales });
    }
  );
};

Sales.remove = (id, result) => {
  sql.query("DELETE FROM sales WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Sales with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted sales with id: ", id);
    result(null, res);
  });
};

Sales.removeAll = result => {
  sql.query("DELETE FROM sales", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} sales`);
    result(null, res);
  });
};

module.exports = Sales;