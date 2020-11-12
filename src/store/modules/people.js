// import swapi from 'swapi-node'

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
    async getPeople ({ commit }, payload) {
      try {
        commit('setIsDataLoading', true)
        const fetchUrl = `https://swapi.dev/api/people${payload ? '/?search=' + payload : ''}`
        const response = await fetch(fetchUrl)
        const peopleData = await response.json()

        console.log('peopleData', peopleData)

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