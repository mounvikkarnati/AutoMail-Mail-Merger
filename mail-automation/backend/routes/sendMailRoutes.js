const express = require("express");
const router = express.Router();
const sendMail = require("../services/mailService");

// ✅ ADD THIS HERE
const normalizeKeys = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key.trim().toLowerCase()] = obj[key];
  });
  return newObj;
};

// Replace placeholders
const replacePlaceholders = (template, data) => {
  let result = template;

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const regex = new RegExp(`{{${key}}}`, "g");
    result = result.replace(regex, value);
  });

  return result;
};

router.post("/", async (req, res) => {
  try {
    const { data, template, subject } = req.body;

    const logs = []; // ✅ ADD THIS

    for (let row of data) {
      console.log("ROW OBJECT:", row);

      const cleanRow = normalizeKeys(row);

      console.log("CLEAN ROW:", cleanRow);

      const email =
        cleanRow["email id"] ||
        cleanRow["email"] ||
        cleanRow["email address"];

      if (!email) {
        console.log("❌ Skipping row (no email):", cleanRow);

        logs.push({
          row,
          cleanRow,
          status: "failed",
          email: "N/A",
          reason: "No email found",
        });

        continue;
      }

      try {
        const personalizedText = replacePlaceholders(template, row);

        await sendMail(email, subject, personalizedText);

        console.log(`✅ Mail sent to ${email}`);

        logs.push({
          row,
          cleanRow,
          status: "success",
          email,
        });

      } catch (err) {
        console.log(`❌ Failed for ${email}`);

        logs.push({
          row,
          cleanRow,
          status: "failed",
          email,
          reason: err.message,
        });
      }

      // ⏳ delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // ✅ SEND LOGS BACK
    res.json({ message: "Emails sent successfully", logs });

  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ error: "Error sending emails" });
  }
});



module.exports = router;