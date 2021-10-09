import { set } from '@/utils/vuex'
import { PLACES_API } from '@/config'

export const namespaced = true

export const state = () => ({
  places: []
})

export const mutations = {
  setPlaces: set('places')

}

export const getters = {

}

export const actions = {
  /** Fetches the list of places */
  async getPlaces({ commit }) {
    const url = `${PLACES_API}`
    const { data } = await this.$axios.get(url)
    commit('setPlaces', data)
  }
}
