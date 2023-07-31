import React, { useState, useEffect, useMemo } from "react"
import useAppContext from "@/lib/useAppContext.jsx"
import style from "@/style/sports.module.css"

export default function () {
  const [error, setError] = useState(false)
  const [sports, setSports] = useState([])
  const [query, setQuery] = useState("")

  const filteredSports = useMemo(() => {
    return sports
      .filter((item) => {
        return item.letter === query?.charAt(0).toUpperCase() || !query
      })
      .map((item) => ({
        ...item,
        sports: item.sports.filter((sport) =>
          sport?.toLowerCase().startsWith(query?.toLowerCase()),
        ),
      }))
  }, [query, sports])

  const getSportsByLetters = (sports) => {
    const Alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i).toUpperCase(),
    )

    return Alphabet.map((l) => ({
      letter: l,
      sports: sports.filter((s) => s.charAt(0).toUpperCase() === l),
    }))
  }
  const {
    services: { getSports },
  } = useAppContext()

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getSports()

      if (err) {
        setError(true)

        return
      }

      const sortedSports = getSportsByLetters(data)

      setSports(sortedSports)
    }
    fetchData()
  }, [getSports])

  return (
    <>
      {error ? (
        <div id="errorText">
          <h2>Error, please try again later.</h2>
        </div>
      ) : (
        <>
          <h1 class="title">Liste des sports olympiques</h1>
          <div id={style.sportSort}>
            <input
              type="text"
              value={query}
              placeholder="rechercher un sport"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <ul>
            {filteredSports.map(
              (obj, key) =>
                obj.sports.length > 0 && (
                  <div key={key}>
                    <li className={style.letterTitle}>{obj.letter}</li>
                    <div className={style.sportsContender}>
                      {obj.sports
                        .sort((a, b) =>
                          a.localeCompare(b, undefined, {
                            sensitivity: "base",
                          }),
                        )
                        .map((s, i) => (
                          <span className={style.sportName} key={i}>
                            {s}
                          </span>
                        ))}
                    </div>
                  </div>
                ),
            )}
          </ul>
        </>
      )}
    </>
  )
}
