import getSportsService from "@/lib/services/getSports.js"
import getCitiesService from "@/lib/services/getCities.js"
import getLocationsService from "@/lib/services/getLocations.js"

const prepareService = ({ api }) => {
  return {
    getSports: getSportsService({ api }),
    getCities: getCitiesService({ api }),
    getLocations: getLocationsService({ api }),
  }
}

export default prepareService
