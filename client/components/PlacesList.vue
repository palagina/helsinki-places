<template lang="pug">
  v-container
    v-col(cols=12 v-if="places.length" )
      v-switch(
        v-model="showOpenSwitch"
        label="Show places open now"
        @change="handleGetPlaces()"
      )
      v-pagination(
        v-model="page"
        :length="Math.ceil(places.length/10)"
      ).mb-5
      v-row(v-for="place in placesOnPage" :key="place.id")
        place-card(:place="place")
      v-pagination(
        v-model="page"
        :length="Math.ceil(places.length/10)"
        )

    v-col(cols=12 v-else)
      .text No data available. Check your connection
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
      showOpenSwitch: false
    }
  },

  computed: {
    ...mapState('places', ['places']),

    placesOnPage() {
      const places = this.places.slice(10 * (this.page - 1), 10 * this.page)
      console.log(places)
      return places
    }
  },

  async mounted() {
    await this.handleGetPlaces()
  },

  methods: {
    ...mapActions('places', ['getPlaces', 'getOpenPlaces']),

    async handleGetPlaces() {
      this.showOpenSwitch ? await this.getOpenPlaces() : await this.getPlaces()
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
