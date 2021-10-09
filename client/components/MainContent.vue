<template lang="pug">
  v-container.mt-10
    v-row
      v-col(cols=7)
        places-list
      v-col(cols=5)
        mapbox(
          access-token="pk.eyJ1IjoibGltYm9uZXZlcm1pbmQiLCJhIjoiY2t1azU0aWl0MHFmYTJ3bzZlYTNrc2l3MSJ9.HExVA_c078AxKTR37M9pow"
          :map-options="mapOptions"
        ).mr-5
</template>

<script>
// import mapboxgl from 'mapbox-gl'
import Mapbox from 'mapbox-gl-vue'

export default {
  components: { Mapbox },
  computed: {
    mapOptions() {
      return {
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [24.938162914, 60.169832654],
        zoom: 15
      }
    }
  },
  watch: {
    places() {
      this.map.resize()
    }
  },
  methods: {
    // onMapLoad(map) {
    //   this.map = map
    // }
  }
}
</script>
