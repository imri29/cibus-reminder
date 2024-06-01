import "dotenv/config";
import express from "express";
import { sendEmail } from "./mailer.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    await sendEmail();
    console.log("Email sent");
  } catch (error) {
    console.error("Error occurred:", error.message);
    console.error(error.stack);
    res
      .status(500)
      .json({ error: "Failed to contact mailer:", details: error.message });
  }
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});
