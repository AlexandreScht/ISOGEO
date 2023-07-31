import routes from "@/lib/routes.js"

const getCities =
  ({ api }) =>
  async () => {
    try {
      const { body } = await api.get(routes.api.getCities())
      return [null, body]
    } catch (error) {
      const errorMessage = Array.isArray(error.message)
        ? error.message
        : [error.message]
      return [errorMessage]
    }
  }

export default getCities
