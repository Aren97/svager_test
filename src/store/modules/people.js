import swapi from 'swapi-node'
export default {
  name: 'people',
  namespaced: true,
  state: {
    people: [],
    count: 0,
    next: '',
    previous: '',
    isDataLoading: false
  },
  mutations: {
    setData (state, { results: people , count, next, previous }) {
      console.log('state', state)
      state.people = people
      state.count = count
      state.next = next
      state.previous = previous
    },
    setIsDataLoading (state, payload) {
      state.isDataLoading = payload
    }
  },
  actions: {
    async getPeople ({ commit }) {
      try {
        commit('setIsDataLoading', true)
        const peopleData = await swapi.get('https://swapi.dev/api/people')

        commit('setData', peopleData)
      } catch (e) {
        console.error('getPeople error', e)
      } finally {
        commit('setIsDataLoading', false)
      }
    }
  },
  getters: {
    getPeople: state => state.people,
    getIsDataLoading: state => state.isDataLoading
  }
}