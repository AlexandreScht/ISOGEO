const express = require("express")
var superagent = require("superagent")
const router = express.Router()
const auth = require("../auth.js")
const config = require("../config")

router.get("/getSports", (req, res) => {
  // When querying /getSports in this app
  auth.getToken(req, config.params).then(() => {
    //Get valid api token
    superagent
      .get(`${config.params.apiUrl}/getSports`) //Query getSports in api
      .set("Authorization", "Bearer " + req.app.get("oauth-token").access_token)
      .end((err, result) => {
        //Set token
        if (!err) {
          //If there is no error
          if (result.text) {
            res.json(JSON.parse(result.text)) //Send result
          } else {
            res.send([]) //Send empty list
          }
        } else {
          res.send([]) //Send empty list
        }
      })
  })
})

router.get("/getCities", (req, res) => {
  auth.getToken(req, config.params).then(() => {
    superagent
      .get(`${config.params.apiUrl}/getCities`)
      .set("Authorization", "Bearer " + req.app.get("oauth-token").access_token)
      .end((err, result) => {
        if (!err) {
          if (result.text) {
            res.json(JSON.parse(result.text))
          } else {
            res.send([])
          }
        } else {
          res.send([])
        }
      })
  })
})

router.get("/getLocations", (req, res) => {
  if (req.query && req.query.city) {
    auth.getToken(req, config.params).then(() => {
      superagent
        .post(`${config.params.apiUrl}/getInfrastructureInCity`, {
          city: req.query.city,
        })
        .set(
          "Authorization",
          "Bearer " + req.app.get("oauth-token").access_token
        )
        .end((err, result) => {
          if (!err) {
            if (result.text) {
              res.json(JSON.parse(result.text))
            } else {
              res.send([])
            }
          } else {
            res.send([])
          }
        })
    })
  } else {
    res.send([])
  }
})

router.get("*", (req, res) => {
  res.setHeader("Content-type", "text/html")
  res.send("<div>Page indisponible</div>")
})

module.exports = router
