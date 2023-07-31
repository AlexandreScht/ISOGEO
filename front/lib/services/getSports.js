import routes from "@/lib/routes.js"

const getSports =
  ({ api }) =>
  async () => {
    try {
      const { body } = await api.get(routes.api.getSports())
      return [null, body[0].split(",")]
    } catch (error) {
      const errorMessage = Array.isArray(error.message)
        ? error.message
        : [error.message]
      return [errorMessage]
    }
  }

export default getSports
