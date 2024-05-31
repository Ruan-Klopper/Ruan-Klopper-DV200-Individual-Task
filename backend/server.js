const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

const propertyRoutes = require("./Routes/propertiesRouter");
app.use("/api/Properties", propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
