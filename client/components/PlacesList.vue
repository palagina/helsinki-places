<template lang="pug">
  v-col(cols=12)
    v-pagination(
      v-model="page"
      :length="Math.ceil(places.length/10)"
    ).mb-5

    v-card(
      v-for="place in placesOnPage"
      :key="place.id"
      outlined
      height="250px"
    ).mb-2
      v-card-title
        .text {{place.name}}
        v-spacer
        span(v-if="place.openNow").red Open now!
      v-card-text
        v-row(no-gutters)
          v-col(cols=3)
            v-img(v-if="place.img" :src="place.img" height="150px" width="150px")
            v-img(v-else src="/no-img.svg" height="150px" width="150px")
          v-col(cols=9)
            v-card-text.pt-0 {{place.description | truncate(200, '...' )}}
            v-card-text.pt-1 Address: {{place.location.address.street_address}}
            v-card-actions
              v-btn(
                text
                color="teal accent-4"
                @click="openDetailsDialog(place)"
              ) See details
    v-pagination(
      v-model="page"
      :length="Math.ceil(places.length/10)"
      )
    details-dialog(
      :detailsDialogOpen="detailsDialogOpen"
      :place="selectedPlace"
      @close-dialog="closeDetailsDialog()"
    ).mt-5
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
      detailsDialogOpen: false,
      selectedPlace: null,
      page: 1
    }
  },

  computed: {
    ...mapState('places', ['places']),

    placesOnPage() {
      const places = this.places.slice(10 * (this.page - 1), 10 * this.page)
      return places
    }
  },

  async mounted() {
    await this.getPlaces()
    console.log(this.places)
  },

  methods: {
    ...mapActions('places', ['getPlaces']),

    openDetailsDialog(place) {
      console.log(place)
      this.selectedPlace = place
      this.detailsDialogOpen = true
    },
    closeDetailsDialog() {
      this.selectedPlace = null
      this.detailsDialogOpen = false
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
