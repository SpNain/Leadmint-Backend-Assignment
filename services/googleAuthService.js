const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const verifyGoogleToken = async (accessToken) => {
  const ticket = await client.getTokenInfo(accessToken);
  return {
    email: ticket.email,
    name: ticket.name || "Unknown User",
  };
};

module.exports = verifyGoogleToken;
