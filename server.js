const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/games");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}
connectToMongoDB();




const productRouter = require("./routes/product");
app.use("/products", productRouter);

app.listen(5123, () => {
  console.log("Server is running at http://localhost:5123");
});
