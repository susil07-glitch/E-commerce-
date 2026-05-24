const nodeMailer = require("nodemailer");
import { EmailOptions } from "./SendEmailType"; 

const sendEmail = async (options: EmailOptions) => {
  try {
    const transporter = nodeMailer.createTransport({
     service: "gmail",
     auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
     }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.email,
      subject: options.subject,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export default sendEmail;