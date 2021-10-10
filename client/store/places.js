import { set } from '@/utils/vuex'
import { PLACES_API } from '@/config'

export const namespaced = true

export const state = () => ({
  places: [],
  placesOnPage: [],
  waitingResponse: true
})

export const mutations = {
  setPlaces: set('places'),
  setWaitingResponse: set('waitingResponse'),
  setPlacesForPage: set('placesOnPage'),
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
}
