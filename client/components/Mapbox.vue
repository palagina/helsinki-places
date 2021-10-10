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
      // placesGeoJson: []
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

    placesGeoJson() {
      if (this.placesOnPage && this.placesOnPage.length) {
        const geoJson = {
          type: 'FeatureCollection',
          features: []
        }

        this.placesOnPage.forEach((place) => {
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
        })
        return geoJson
      }
      return []
    },
  },

  created() {
    this.map = null
    // this.placesGeoJson = this.getPlacesGeoJson()
  },

  watch: {
    placesOnPage() {
      this.map.resize()
      this.updateSources(this.map)
      // this.placesGeoJson = this.getPlacesGeoJson()
    }
  },

  methods: {
    mapLoaded(map) {
      console.log('map loaded')
      this.map = map
      this.updateSources(map)

      // map.flyTo({
      //   center: dot,
      //   essential: true,
      //   zoom: 15
      // })
    },

    updateSources(map) {
      if (map.getSource('places')) {
        map.getSource('places').setData(this.placesGeoJson)
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
