<template lang="pug">
  v-container
    v-overlay(v-model="waitingResponse").loader
      v-progress-circular(indeterminate color="teal accent-4" size=50)
    v-switch(
      v-model="showOpenSwitch"
      label="Show places open now"
      @change="handleGetPlaces()"
    )
    v-col(cols=12 v-if="places.length" )
      v-pagination(
        v-model="page"
        :length="Math.ceil(places.length/10)"
      ).mb-5

      v-row(v-for="place in tenPlaces" :key="place.id")
        place-card(:place="place")
      v-pagination(
        v-model="page"
        :length="Math.ceil(places.length/10)"
        ).mt-5

    v-col(cols=12 v-else)
      span(v-if="!waitingResponse") No data available
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  filters: {
    truncate (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    }
  },
  data() {
    return {
      selectedPlace: null,
      page: 1,
      showOpenSwitch: false,
      loading: true
    }
  },

  computed: {
    ...mapState('places', ['places', 'waitingResponse']),

    tenPlaces() {
      const tenPlaces = this.places.slice(10 * (this.page - 1), 10 * this.page)
      this.setPlacesOnPage({ placesOnPage: tenPlaces })
      return tenPlaces
    }
  },

  async mounted() {
    await this.handleGetPlaces()
  },

  methods: {
    ...mapActions('places', ['getPlaces', 'setPlacesOnPage']),

    async handleGetPlaces() {
      this.showOpenSwitch ? await this.getPlaces({ open: true }) : await this.getPlaces({ open: false })
      this.setPlacesOnPage({ placesOnPage: this.tenPlaces })
    }
  }
}
</script>

<style lang="sass" scoped>
  .loader
    z-index: 1000
</style>
