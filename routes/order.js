const express = require("express");
// set up order router
const router = express.Router();

const {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

/*
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders/:id
    DELETE /orders/:id
*/

// get orders
router.get("/", async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// get order
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrder(id);
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// create new order
router.post("/", async (req, res) => {
  try {
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const products = req.body.products;
    const totalPrice = req.body.totalPrice;

    const newOrder = await addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrice
    );

    res.status(200).send(newOrder);
  } catch (error) {
    console.log(error.response.data);
    res.status(400).send({ message: "Unknown error" });
  }
});

// update order
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const updatedOrder = await updateOrder(id, status);
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

// delete order
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteOrder(id);
    res.status(200).send({
      message: `Order #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Unknown error" });
  }
});

module.exports = router;
