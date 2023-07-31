import { createContext, useContext, useMemo, useEffect, useState } from "react"
import auth from "@/lib/auth.js"
import prepareService from "@/lib/prepareService.js"
import createAPIClient from "@/lib/createAPIClient.js"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const { ...otherProps } = props

  const [services, setServices] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = await auth.getToken({
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          apiUrl: process.env.API_URL,
        })
        const api = createAPIClient({ jwt })
        const newServices = prepareService({ api })

        setServices(newServices)
      } catch (error) {
        console.error("Erreur lors de la récupération du token :", error)
      }
    }

    fetchData()
  }, [])

  const contextValues = useMemo(() => {
    return {
      services,
    }
  }, [services])

  if (services === null) {
    return <div>Chargement...</div>
  }

  return <AppContext.Provider {...otherProps} value={contextValues} />
}

const useAppContext = () => {
  const { services } = useContext(AppContext)

  return { services }
}

export default useAppContext
