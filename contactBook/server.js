const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/contactRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost/${PORT}`);
});
