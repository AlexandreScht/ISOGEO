require("dotenv").config()

const config = {
  params: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    apiUrl: process.env.API_URL,
  },
}

module.exports = config
