import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mailgun from "mailgun-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

// ✅ Route to send mail
app.post("/api/send-mail", (req, res) => {
  const { name, email, service, message } = req.body;

  const data = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `New ${service} Inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error("Mailgun Error:", error);
      return res.status(500).json({ success: false, error });
    }
    console.log("Email sent:", body);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Mailgun server running on http://localhost:${PORT}`));
