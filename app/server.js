const express = require("express")
const bodyParser = require("body-parser")
var cors = require("cors")

const port = 5000

const apiRoute = require("./server/routes/api.js")

var app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api", apiRoute)

app.get("*", (req, res) => {
  res.setHeader("Content-type", "text/html")
  res.send("<div>Page indisponible</div>")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
