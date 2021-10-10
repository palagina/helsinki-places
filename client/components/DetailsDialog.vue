
<template lang='pug'>
  v-dialog(v-model='detailsDialogOpen' max-width='50rem' persistent )
    v-card(elevation=3 tile v-if='place')
      v-card-title {{ place.name }}
        v-spacer
      v-card-text
        v-row(no-gutters)
          v-col(cols=4 md=4)
            v-img(v-if="place.img" :src="place.img")
            v-img(v-else src="/no-img.svg")
          v-col(cols=8)
            v-card-text.pt-0 {{place.description}}
            v-card-text Address: {{place.location.address.street_address}}
      v-divider
      v-card-title Opening hours
      v-card-text
        v-list(v-for="day in place.opening_hours" :key="day.weekday_id")
          v-list-item {{getOpeningHours(day)}}
      v-card-actions
        v-spacer
        v-btn(text color='teal accent-4' @click="$emit('close-dialog')") Close
</template>

<script>
export default {
  props: {
    detailsDialogOpen: {
      type: Boolean,
      required: true,
      default: false
    },
    place: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  mounted() {

  },
  methods: {
    getOpeningHours(day) {
      const arrayOfWeekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      const dayName = arrayOfWeekdays[day.weekday_id - 1]
      let schedule = null
      if (day.open24h === false && day.opens && day.closes) {
        schedule = `${dayName}: ${day.opens.slice(0, -3)} - ${day.closes.slice(0, -3)}`
      } else if (!day.opens && !day.closes) {
        schedule = `${dayName}: closed`
      } else {
        schedule = `${dayName}: open 24h`
      }
      return schedule
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
