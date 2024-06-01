import nodeMailer from "nodemailer";

const sender = process.env.SENDER;
const password = process.env.PASSWORD;
const emails = process.env.EMAILS.split(",").filter(Boolean);

export async function sendEmail() {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: password,
    },
  });

  const message = await transporter.sendMail({
    from: "Discount Finder",
    to: emails,
    subject: "Cibus Balance Alert!",
    html: `<b>This is your monthly notification.</b><br>
           <p>We're at the end of the month. You need to manage you Cibus balance.</p>
           <a href="https://wolt.com/en/isr/petah-tikva/venue/woltilgiftcards">Click here</a> to buy a voucher from Wolt.`,
  });

  console.log("Message sent: %s", message.messageId);
}
