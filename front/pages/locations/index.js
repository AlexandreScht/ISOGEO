import React, { useState, useEffect, useCallback, useMemo } from "react"
import Select from "react-select"
import ReactSlider from "react-slider"
import { Card, Row, Col } from "react-bootstrap"
import useAppContext from "@/lib/useAppContext.jsx"
import style from "@/style/location.module.css"

export default function () {
  const [error, setError] = useState(false)
  const [locations, setLocations] = useState([])
  const [query, setQuery] = useState("")
  const [options, setOptions] = useState([])
  const [city, setCity] = useState(null)

  const {
    services: { getCities, getLocations },
  } = useAppContext()

  const filteredLocations = useMemo(() => {
    return locations.filter((item) => {
      return (
        item.capacity <= (Number.parseInt(query.max) || Infinity) &&
        item.capacity >= (Number.parseInt(query.min) || 0) &&
        (item.sports.some((sport) =>
          sport.toLowerCase().startsWith(query.sport?.toLowerCase()),
        ) ||
          !query.sport)
      )
    })
  }, [locations, query])

  const handleChangeSelect = useCallback(
    async (value) => {
      const [err, data] = await getLocations({ city: value.label })

      if (err) {
        setError(true)

        return
      }

      setLocations(data)
      setCity(value.label)
    },
    [getLocations],
  )

  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await getCities()

      if (err) {
        setError(true)

        return
      }

      setOptions(
        data.map((state) => ({
          value: state.toLowerCase(),
          label: state,
        })),
      )
    }
    fetchData()
  }, [getCities])

  const handleSliderChange = (values) => {
    setQuery((prev) => ({ ...prev, min: values[0], max: values[1] }))
  }

  return (
    <>
      {error ? (
        <div id="errorText">
          <h2>Error, please try again later.</h2>
        </div>
      ) : (
        <div id={style.body}>
          <h1>Sites olympiques</h1>
          <div id={style.contender}>
            <div className={style.subContender}>
              <h2>Ville</h2>
              <Select
                className="basic-single"
                instanceId="selectId"
                classNamePrefix="select"
                name="citySelect"
                options={options}
                placeholder="Choisir une ville"
                onChange={handleChangeSelect}
              />
              {locations && locations.length > 0 && (
                <div id={style.rangeContender}>
                  <h2>Trier</h2>
                  <span>Capaciter :</span>
                  <ReactSlider
                    className={style.horizontal_slider}
                    thumbClassName={style.thumb_range}
                    trackClassName={style.track_range}
                    defaultValue={[0, 100000]}
                    min={0}
                    max={100000}
                    ariaLabel={["Lower thumb", "Upper thumb"]}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => (
                      <div {...props}>{state.valueNow}</div>
                    )}
                    pearling
                    minDistance={500}
                    onAfterChange={handleSliderChange}
                  />
                  <span>Sport :</span>
                  <input
                    type="text"
                    id={style.sportSort}
                    value={query.sport}
                    onChange={(e) =>
                      setQuery((prev) => ({ ...prev, sport: e.target.value }))
                    }
                  />
                </div>
              )}
            </div>
            <div></div>
            {locations && locations.length > 0 && (
              <div className={style.subContender}>
                <div>
                  <h2>Sites olympiques à {city}</h2>
                </div>
                <Row lg={3}>
                  {filteredLocations.map((l, id) => {
                    const { name, sports, transports, capacity } = l
                    return (
                      <Col className="d-flex pb-2" key={`col-${id}`}>
                        <Card className="flex-fill" key={id}>
                          <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>
                              <b>Sports : </b>
                              {sports.map((sport, i) => (
                                <li key={`sport-${i}`}>{sport}</li>
                              ))}
                            </Card.Text>
                            {transports && (
                              <Card.Text>
                                <b>Accessibilité : </b>
                                {transports.map((t, i) => (
                                  <li key={`t-${i}`}>{t}</li>
                                ))}
                              </Card.Text>
                            )}
                            {capacity && (
                              <Card.Text>
                                <b>Capacité :</b>{" "}
                                <span>
                                  {capacity}{" "}
                                  {Number.parseInt(capacity, 10) > 1
                                    ? "personnes"
                                    : "personne"}
                                </span>
                              </Card.Text>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })}
                </Row>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
