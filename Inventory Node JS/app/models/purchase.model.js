const sql = require("./db.js");

// constructor
const Purchase = function(purchase) {
  this.PurchaseId = purchase.PurchaseId;
  this.PurchaseDate = purchase.PurchaseDate;
  this.NoReceived = purchase.NoReceived;
  this.SupplierName = purchase.SupplierName;
  this.ProductId = purchase.ProductId;
};

Purchase.create = (newPurchase, result) => {
  sql.query("INSERT INTO purchase SET ?", newPurchase, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created purchase: ", { id: res.insertId, ...newPurchase });
    result(null, { id: res.insertId, ...newPurchase });
  });
};

Purchase.findById = (PurchaseID, result) => {
  sql.query(`SELECT * FROM purchase WHERE id = ${PurchaseID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found purchase: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Purchase with the id
    result({ kind: "not_found" }, null);
  });
};



// Purchase.getAll = result => {
//   sql.query("SELECT * FROM purchase", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("Purchase: ", res);
//     result(null, res);
//   });
// };

Purchase.getAll = result =>{
  sql.query("SELECT purchase.PurchaseId, purchase.PurchaseDate, purchase.NoReceived, purchase.SupplierName, product.ProductId  FROM (purchase  INNER JOIN product ON purchase.PurchaseID = product.ProductId);", (err,res) =>{
    if(err){
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Purchase: ", res);
    result(null, res);
  });
};



Purchase.updateById = (id, purchase, result) => {
  sql.query(
    "UPDATE purchase SET PurchaseDate = ?, NoReceived = ?, SupplierName = ? WHERE id = ?",
    [purchase.PurchaseDate, purchase.NoReceived, purchase.SupplierName, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Purchase with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated purchase: ", { id: id, ...purchase });
      result(null, { id: id, ...purchase });
    }
  );
};


Purchase.remove = (id, result) => {
  sql.query("DELETE FROM purchase WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Purchase with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted purchase with id: ", id);
    result(null, res);
  });
};

Purchase.removeAll = result => {
  sql.query("DELETE FROM purchase", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} purchase`);
    result(null, res);
  });
};

module.exports = Purchase;