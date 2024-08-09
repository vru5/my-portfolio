const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

// transport
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { email, message } = req.body;

    // validation
    if (!email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Email and message are required." });
    }

    // Email matter
    transporter.sendMail({
      to: "hippargivrushali@gmail.com",
      from: "hippargiv@gmail.com",
      subject: "Regarding Portfolio",
      html: `
            <h5>Detail Information</h5>
            <ul>
              <li>Email: ${email}</li>
              <li>Message: ${message}</li>
            </ul>
        `,
    });

    return res.status(200).send({
      success: true,
      message: "Your message sent successfully!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      err,
    });
  }
};

module.exports = { sendEmailController };
