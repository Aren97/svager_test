<template>
  <div id="app">
    <people-list />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PeopleList from '@/components/people-list'
export default {
  name: 'App',
  components: {
    PeopleList
  },
  computed: {
    ...mapGetters('people', ['getIsDataLoading'])
  },
  mounted() {
    this.getPeople()
  },
  methods: {
    ...mapActions('people', ['getPeople'])
  }
}
</script>
