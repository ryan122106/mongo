require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL + "/games");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}
connectToMongoDB();


const productRouter = require("./routes/product");
app.use("/api/products", productRouter);
app.use("/api/orders", require("./routes/order"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/image", require("./routes/image"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/users", require("./routes/user"));

app.use("/uploads", express.static("uploads"));

app.listen(5123, () => {
  console.log("Server is running at http://localhost:5123");
});
