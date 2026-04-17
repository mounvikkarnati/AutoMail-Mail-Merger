const express = require("express");
const router = express.Router();
const multer = require("multer");
const XLSX = require("xlsx");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST: Upload Excel
router.post("/", upload.single("file"), (req, res) => {
  try {
    const filePath = req.file.path;

    // Read Excel file
    const workbook = XLSX.readFile(filePath);

    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const sheetData = workbook.Sheets[sheetName];

    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheetData);

    res.json({
      message: "File processed successfully",
      data: jsonData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing file" });
  }
});

module.exports = router;