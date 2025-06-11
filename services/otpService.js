const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const sendOtpEmail = async (email, otp) => {
  const tranEmailApi = new Sib.TransactionalEmailsApi();

  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "hnspnain@gmail.com",
        name: "Ad Platform",
      },
      to: [{ email }],
      subject: "Your OTP for Signup",
      htmlContent: `<h3>Your OTP is: <strong>${otp}</strong></h3>`,
    });

    console.log(`📧 OTP sent to ${email}`);
  } catch (error) {
    console.error("Failed to send OTP:", error.response?.body || error.message);
    throw new Error("Failed to send otp");
  }
};

module.exports = sendOtpEmail;
