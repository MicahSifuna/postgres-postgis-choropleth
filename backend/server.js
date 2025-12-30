const express = require("express");
const cors = require("cors");

const countiesRoute = require("./routes/counties");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/counties", countiesRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
