import { set } from '@/utils/vuex'
import { PLACES_API } from '@/config'

export const namespaced = true

export const state = () => ({
  places: [],
  placesOnPage: [],
  waitingResponse: true,
  selectedPlace: null
})

export const mutations = {
  setPlaces: set('places'),
  setWaitingResponse: set('waitingResponse'),
  setPlacesForPage: set('placesOnPage'),
  setSelected: set('selectedPlace')
}

export const actions = {
  /** Fetches the list of places */
  async getPlaces({ commit }, { open }) {
    try {
      commit('setWaitingResponse', true)
      const url = open === true ? `${PLACES_API}?open=true` : `${PLACES_API}`
      const { data } = await this.$axios.get(url)
      commit('setPlaces', data)
      commit('setWaitingResponse', false)
    } catch {
      commit('setWaitingResponse', false)
    }
  },

  /** Sets currently rendered places to the store*/
  setPlacesOnPage({ commit }, { placesOnPage }) {
    commit('setPlacesForPage', placesOnPage)
  },

   /** Sets selected place to show on map*/
  setSelectedPlace({ commit }, { place }) {
    commit('setSelected', place)
  },
}
