const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// IMPORT ROUTES
const uploadRoutes = require("./routes/uploadRoutes");
const sendMailRoutes = require("./routes/sendMailRoutes");

// ✅ MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());

// ✅ THEN ROUTES
app.use("/upload", uploadRoutes);
app.use("/send-mails", sendMailRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Mail Automation Backend Running 🚀");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});