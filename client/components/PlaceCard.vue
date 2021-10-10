<template lang="pug">
    v-card(
      outlined
      height="250px"
      width="100%"
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
            v-card-text.pt-0 {{place.description | truncate(100, '...' )}}
            v-card-text.pt-1 Address: {{place.location.address.street_address}}
            v-card-actions
              v-btn(text color="teal accent-4" @click="detailsDialogOpen = true") See details
              v-spacer
              v-btn(text color="teal accent-4" @click="") Show on map
      details-dialog(
        :detailsDialogOpen="detailsDialogOpen"
        :place="place"
        @close-dialog="detailsDialogOpen = false"
      ).mt-5
</template>

<script>
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
  props: {
    place: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      detailsDialogOpen: false
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
