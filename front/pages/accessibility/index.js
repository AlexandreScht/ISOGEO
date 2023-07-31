import React, { useState, useEffect } from "react"
import useAppContext from "@/lib/useAppContext.jsx"
import Select from "react-select"
import style from "@/style/accessibility.module.css"
import { Card, Row, Col } from "react-bootstrap"

export default function () {
  const [error, setError] = useState(false)
  const [ligne, setLignes] = useState([])
  const [infos, setInfos] = useState([])

  const {
    services: { getCities, getLocations },
  } = useAppContext()

  const handleChangeSelect = (e) => {
    setInfos(e.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getCities()

      if (err) {
        setError(true)

        return
      }

      data.map(async (city) => {
        const [err, locationsData] = await getLocations({ city })

        if (err) {
          console.log(err)
          setError(true)

          return
        }

        setLignes((prev) =>
          locationsData.reduce(
            (acc, obj) => {
              if (obj.transports) {
                obj.transports.forEach((items) => {
                  const existingIndex = acc.findIndex(
                    (item) =>
                      item.label === items && !item.value.includes(obj.name),
                  )

                  if (existingIndex !== -1) {
                    acc[existingIndex].value.push(obj.name)
                  } else {
                    acc.push({
                      value: [obj.name],
                      label: items,
                    })
                  }
                })
              }
              return acc
            },
            [...prev],
          ),
        )
      })
    }
    fetchData()
  }, [getCities])

  return (
    <>
      {error ? (
        <div id="errorText">
          <h2>Error, please try again later.</h2>
        </div>
      ) : (
        <div>
          {ligne && ligne.length > 0 && (
            <div>
              <h1 class="title">Sites olympiques</h1>
              <div id={style.findAccessibility}>
                <Select
                  id={style.lineSelect}
                  className="basic-single"
                  instanceId="selectId"
                  classNamePrefix="select"
                  name="LineSelect"
                  options={ligne}
                  placeholder="Choisir une ligne de transport"
                  onChange={handleChangeSelect}
                />
              </div>
              {infos && infos.length > 0 && (
                <div id={style.contender}>
                  <h1 class="title">
                    {infos.length > 1
                      ? "Sites olympiques accessibles via cette ligne"
                      : "Site olympique accessibles via cette ligne"}
                  </h1>
                  <div id={style.stadeContender}>
                    <Row lg={3} className="justify-content-center">
                      {infos
                        .sort((a, b) =>
                          a.localeCompare(b, undefined, {
                            sensitivity: "base",
                          }),
                        )
                        .map((sport, key) => (
                          <Col
                            className="d-flex text-center pb-2"
                            key={`col-${key}`}
                          >
                            <Card className="flex-fill" key={key}>
                              <Card.Body>
                                <Card.Title>{sport}</Card.Title>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}
