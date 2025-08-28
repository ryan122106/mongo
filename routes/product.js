const express = require("express");
// create a express router
const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router.get("/", async (req, res) => {
  const category = req.query.category;
  const page = req.query.page;
  const products = await getProducts(category, page);
  res.status(200).send(products);
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProduct(id);
  res.status(200).send(product);
});


router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).send({ message: "Name, price, and category are required" });
    }

    const newProduct = await addProduct(name, description, price, category, image);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, category, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).send({ message: "Name, price, and category are required" });
    }

    const updated = await updateProduct(id, name, description, price, category, image);
    res.status(200).send(updated);
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

    
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProduct(id);
    res.status(200).send({ message: `Product with ID ${id} deleted` });
  } catch (error) {
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
