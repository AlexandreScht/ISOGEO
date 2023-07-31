// import Container from "react-bootstrap/Container"
import styles from "@/style/components/layout.module.css"
import routes from "@/lib/routes.js"
import classNames from "classnames"
import { useRouter } from "next/router"

const Layout = ({ children }) => {
  const router = useRouter()

  const HandleRoute = (route) => {
    router.push(route)
  }

  const pages = [
    {
      link: routes.pages.home(),
      title: "Accueil",
      routeName: "/",
    },
    {
      link: routes.pages.locations(),
      title: "Sites olympiques",
      routeName: "/locations",
    },
    {
      link: routes.pages.sports(),
      title: "Sports",
      routeName: "/sports",
    },
    {
      link: routes.pages.accessibility(),
      title: "Accessibilité",
      routeName: "/accessibility",
    },
  ]

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLink}>
          <div id={styles.bgSelector}></div>
          {pages.map((p, i) => (
            <label key={i} id={"lab" + i} htmlFor={"link" + i}>
              <input
                type="radio"
                name="link"
                id={"link" + i}
                className={styles["rad" + i]}
                onChange={() => HandleRoute(p.link)}
                defaultChecked={p.routeName === router.pathname}
              />
              {p.title}
            </label>
          ))}
        </div>
      </header>

      {children}
    </>
  )
}

export default Layout
