// import swapi from 'swapi-node'

export default {
  name: 'people',
  namespaced: true,
  state: {
    people: [],
    count: 0,
    page: 1,
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
    },
    setCurrentPage (state, payload) {
      state.page = payload
    }
  },
  actions: {
    async getPeople ({ commit, state }, payload) {
      try {
        commit('setIsDataLoading', true)
        let getParams = `?page=${state.page}`

        if (payload && payload.search) {
          getParams += '&search=' + payload.search
        }

        const fetchUrl = `https://swapi.dev/api/people/${getParams}`
        const response = await fetch(fetchUrl)
        const peopleData = await response.json()

        console.log('peopleData', peopleData)

        commit('setData', peopleData)
      } catch (e) {
        console.error('getPeople error', e)
      } finally {
        commit('setIsDataLoading', false)
      }
    },
    toPage ({ commit }, { to }) {
      console.log('to', to)
      const page = to.split('=') && to.split('=')[1]

      commit('setCurrentPage', page)
    }
  },
  getters: {
    getPeople: state => state.people,
    getIsDataLoading: state => state.isDataLoading,
    next: state => state.next,
    previous: state => state.previous
  }
}