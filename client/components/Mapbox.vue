<template lang="pug">
  v-mapbox(
    :access-token="accessToken"
    :map-options="mapOptions"
    @map-load="mapLoaded"
  )
</template>

<script>
import { mapState } from 'vuex'
// import Mapbox from 'mapbox-gl-vue'

export default {
  // components: { Mapbox },
  data() {
    return {
      mapIsLoaded: false,
      accessToken: 'pk.eyJ1IjoibGltYm9uZXZlcm1pbmQiLCJhIjoiY2t1azU0aWl0MHFmYTJ3bzZlYTNrc2l3MSJ9.HExVA_c078AxKTR37M9pow',
      placesGeoJson: []
    }
  },
  computed: {
    ...mapState('places', ['placesOnPage']),
    mapOptions() {
      return {
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [24.938162914, 60.169832654],
        zoom: 13
      }
    },
  },

  created() {
    this.map = null // Mapbox breaks if stored as reactive
    this.placesGeoJson = this.getPlacesGeoJson()
  },

  watch: {
    placesOnPage(val) {
      this.map.resize()
      console.log('new places', val)
      this.updateSources(this.map)
      this.placesGeoJson = this.getPlacesGeoJson()
    }
  },

  methods: {
    mapLoaded(map) {
      this.map = map
      this.updateSources(map)

      // map.flyTo({
      //   center: dot,
      //   essential: true,
      //   zoom: 15
      // })
    },

    getPlacesGeoJson() {
      if (this.placesOnPage && this.placesOnPage.length) {
        const geoJson = {
          type: 'FeatureCollection',
          features: []
        }

        this.placesOnPage.forEach((place) => {
          if (place.location.lat && place.location.lon) {
            geoJson.features.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [place.location.lon, place.location.lat]
              },
              properties: {
                id: place.id
              }
            })
          }
        })
        return geoJson
      }
      return []
    },

    updateSources(map) {
      if (this.map.getSource('places')) {
        this.map.getSource('places').setData(this.placesGeoJson)
      } else {
        // Adding source to the map
        map.addSource('places', {
          type: 'geojson',
          data: this.placesGeoJson
        }),

        // Adding places layer to the map
        map.addLayer({
          id: 'placesPoints',
          minzoom: 11,
          maxzoom: 20,
          type: 'circle',
          source: 'places',
          paint: {
            'circle-color': 'green',
            'circle-radius': 12
          }
        })
      }
    }
  }
}
</script>

<style lang="sass">
#map
  height: 80vh
  width: 40vw
  position: fixed
  border-radius: 0 0 4px 4px !important
// Hide the Mapbox links
.mapboxgl-ctrl-attrib
  display: none
</style>
