import "bootstrap/dist/css/bootstrap.min.css"
import "@/style/global.css"
import Layout from "@/components/Layout"
import Head from "next/head"
import { AppContextProvider } from "@/lib/useAppContext.jsx"

export default function MyApp({ Component, pageProps }) {
  const renderWithLayout =
    Component.getLayout ||
    ((page) => {
      return <Layout>{page}</Layout>
    })

  return (
    <AppContextProvider>
      <Head>
        <title> ISOGEO </title>
        <meta name="description" content="Isogeo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderWithLayout(<Component {...pageProps} />)}
    </AppContextProvider>
  )
}
