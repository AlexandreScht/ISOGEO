/* eslint-env node */
require("dotenv").config()

module.exports = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    API_URL: process.env.API_URL,
  },
}
