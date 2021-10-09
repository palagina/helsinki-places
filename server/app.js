const express = require("express")
const app = express()
const cors = require("cors")
const placesRouter = require("./controllers/places")
const middleware = require("./utils/middleware")

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/places", placesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.formatData)

module.exports = app