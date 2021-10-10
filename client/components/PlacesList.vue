<template lang="pug">
  v-container
    v-overlay(v-model="waitingResponse").loader
      v-progress-circular(indeterminate color="teal accent-4" size=50)
    v-row
      v-switch(
        v-model="showOpenSwitch"
        label="Show places open now"
        @change="handleGetPlaces()"
      )
      v-spacer
      v-select(
        outlined
        dense
        v-model="countPerPage"
        :items="[5, 10, 20, 30, 40, 50]"
        label="Select items per page"
        @change="setPlacesPerPage()"
      ).mx-5
    v-col(cols=12 v-if="places.length" )
      v-pagination(
        v-model="page"
        @input="setPlacesPerPage()"
        :length="paginationLength"
      ).mb-5

      v-row(v-for="place in placesPerPage" :key="place.id")
        place-card(:place="place")
      v-pagination(
        v-model="page"
        @input="setPlacesPerPage()"
        :length="paginationLength"
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
      loading: true,
      countPerPage: 10,
      placesPerPage: []
    }
  },

  computed: {
    ...mapState('places', ['places', 'waitingResponse']),

    paginationLength() {
      return Math.ceil(this.places.length/this.countPerPage)
    }
  },

  async mounted() {
    await this.handleGetPlaces()
  },

  methods: {
    ...mapActions('places', ['getPlaces', 'setPlacesOnPage']),

    async handleGetPlaces() {
      this.showOpenSwitch ? await this.getPlaces({ open: true }) : await this.getPlaces({ open: false })
      this.setPlacesOnPage({ placesOnPage: this.placesPerPage })
      this.setPlacesPerPage()
    },

    setPlacesPerPage() {
      this.placesPerPage = this.places.slice(this.countPerPage * (this.page - 1), this.countPerPage * this.page)
      this.setPlacesOnPage({ placesOnPage: this.placesPerPage })
    }
  }
}
</script>

<style lang="sass" scoped>
  .loader
    z-index: 1000
</style>
