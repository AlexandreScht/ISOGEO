import routes from "@/lib/routes.js"

const getLocations =
  ({ api }) =>
  async (values) => {
    try {
      const { body } = await api.get(routes.api.getLocations(values))
      return [null, body]
    } catch (error) {
      const errorMessage = Array.isArray(error.message)
        ? error.message
        : [error.message]
      return [errorMessage]
    }
  }

export default getLocations
