<template>
  <div id="app" class="app-wrap">
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
  mounted () {
    this.getPeople()
  },
  methods: {
    ...mapActions('people', ['getPeople'])
  }
}
</script>

<style lang="scss">
  * {
    box-sizing: content-box;
  }
  body, html {
    padding: 0;
    margin: 0;
  }

  .app-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
