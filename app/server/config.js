import dotenv from "dotenv"
import { resolve } from "path"

dotenv.config({ path: resolve(".env.local") })

const config = {
  params: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    apiUrl: process.env.API_URL,
  },
}

export default config
