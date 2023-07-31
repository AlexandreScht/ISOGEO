const createRouteWithParams = (route, params) => {
  if (!params) {
    return route
  }

  const qs = new URLSearchParams(params).toString()

  return `${route}?${qs}`
}

const routes = {
  pages: {
    home: () => "/",
    locations: () => "/locations",
    sports: () => "/sports",
    accessibility: () => "/accessibility",
  },
  api: {
    getSports: () => "/getSports",
    getCities: () => "/getCities",
    getLocations: (params) => createRouteWithParams("/getLocations", params),
  },
}

export default routes
