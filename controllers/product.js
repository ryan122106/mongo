// import the Product model
const Product = require("../models/product");

async function getProducts(category, page = 1, itemsPerPage = 6) {
  let filter = {};
  if (category) {
    filter.category = category;
  }
  const products = await Product.find(filter)
    .limit(itemsPerPage)
    .skip((page - 1) * itemsPerPage)
    .sort({ _id: 1 });
  return products;
}

async function getProduct(id) {
  return await Product.findById(id);
}

async function addProduct(name, description, price, category, image) {
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    image,
  });
  await newProduct.save();
  return newProduct;
}

async function updateProduct(id, name, description, price, category, image) {
  return await Product.findByIdAndUpdate(
    id,
    { name, description, price, category, image },
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
