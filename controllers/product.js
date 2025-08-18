// import the Product model
const Product = require("../models/product");

async function getProducts(category) {
  let filter = {};
  if (category) {
    filter.category = category;
  }
  const products = await Product.find(filter).sort({ _id: -1 });
  return products;
}

async function getProduct(id) {
  return await Product.findById(id);
}

async function addProduct(name, description, price, category) {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  await newProduct.save();
  return newProduct;
}

async function updateProduct(id, name, description, price, category) {
  return await Product.findByIdAndUpdate(
    id,
    { name, description, price, category },
    { new: true }
  );
}

async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
