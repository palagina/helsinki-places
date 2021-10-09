const placesRouter = require("express").Router()
const axios = require("axios")

const baseUrl = "https://open-api.myhelsinki.fi/v1"

placesRouter.get("/", async (req, res, next) => {
  axios.get(`${baseUrl}/places/?limit=100`)
    .then(data => formatData(data.data.data))
    .then(data => filterPlaces(data, req.query))
    .then(data => res.status(200).send(data))
    .catch(err => next(err))
})

// show all places or only open ones
const filterPlaces = (data, filters) => {
  if (filters.open === "true") {
    const openNow = []
    data.forEach((place) => {
      if (place.opening_hours && checkSchedule(place.opening_hours)) {
        openNow.push(place)
      }
    })
    return openNow
  }
  return data
}

// checking schedule for day of the week and opening hours
const checkSchedule = (opening_hours) => {
  const today = new Date()
  const weekDay = today.getDay()
  const todaySchedule = opening_hours.find(day => day.weekday_id === weekDay)
  const timeNow = `${today.getHours()}:${today.getMinutes()}`
  if (timeNow >= todaySchedule.opens && timeNow < todaySchedule.closes) {
    return true
  } else if (todaySchedule.open24h) {
    return true
  }
  return false
}

// eliminating unrequired parameters
const formatData = (data) => {
  const formatedData = []
  data.forEach((place) => {
    const formatedPlace = {
      id: place.id,
      name: place.name.en,
      info_url: place.info_url,
      location: place.location,
      img: (place.description.images && place.description.images.length) ? place.description.images[0].url : null,
      description: place.description.body,
      opening_hours: place.opening_hours.hours
    }
    formatedData.push(formatedPlace)
  })
  return formatedData
}

module.exports = placesRouter

