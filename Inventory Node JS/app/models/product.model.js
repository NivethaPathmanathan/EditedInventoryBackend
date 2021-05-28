const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.ProductId = product.ProductId;
  this.ProductName = product.ProductName;
  this.BrandName = product.BrandName;
  this.Label = product.Label;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { ProductId: res.insertId, ...newProduct });
    result(null, { ProductId: res.insertId, ...newProduct });
  });
};

Product.findById = (ProductID, result) => {
  sql.query(`SELECT * FROM product WHERE ProductId = ${ProductID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("product: ", res);
    result(null, res);
  });
};

Product.updateById = (ProductId, product, result) => {
  sql.query(
    "UPDATE product SET ProductName = ?, BrandName = ?, Label = ? WHERE ProductId = ?",
    [product.ProductName, product.BrandName, product.Label, ProductId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { ProductId: ProductId, ...product });
      result(null, { ProductId: ProductId, ...product });
    }
  );
};

Product.remove = (ProductId, result) => {
  sql.query("DELETE FROM product WHERE ProductId = ?", ProductId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with ProductId: ", ProductId);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM product", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} product`);
    result(null, res);
  });
};

module.exports = Product;