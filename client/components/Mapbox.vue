<template lang="pug">
  v-mapbox(
    :access-token="accessToken"
    :map-options="mapOptions"
    @map-load="mapLoaded"
  )
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: false,
      default: null
    },
    accessToken: {
      type: String,
      required: false,
      default: 'pk.eyJ1IjoibGltYm9uZXZlcm1pbmQiLCJhIjoiY2t1azU0aWl0MHFmYTJ3bzZlYTNrc2l3MSJ9.HExVA_c078AxKTR37M9pow'
    }
  },
  data() {
    return {
      mapIsLoaded: false
    }
  },
  computed: {
    mapOptions() {
      if (this.options) {
        return {
          ...this.options
        }
      } else {
        return {
          center: [0, 0],
          zoom: 1,
          renderWorldCopies: true
        }
      }
    }
  },

  created() {
    this.map = null // Mapbox breaks if stored as reactive
  },
  methods: {
    mapLoaded(map) {
      this.map = map
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
