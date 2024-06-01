import "dotenv/config";
import express from "express";
import { sendEmail } from "./mailer.js";
import { isLastDayOfMonth } from "date-fns";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    if (isLastDayOfMonth(new Date())) {
      await sendEmail();
      res.status(200).send("Email sent successfully");
    } else {
      res.status(200).send("Not the last day of the month");
    }
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
