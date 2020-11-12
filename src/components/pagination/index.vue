<template>
  <div class="pagination">
    prev - {{previous}}
    next - {{next}}
    <button class="pagination-prev" :disabled="!previous" @click="toPage(previous)">
      Предыдущая
    </button>
    <button class="pagination-next" :disabled="!next" @click="toPage(next)">
      Следующая
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'pagination',
  computed: {
    ...mapGetters('people', ['previous', 'next'])
  },
  methods: {
    ...mapActions('people', { changePage: 'toPage' }),
    toPage (to) {
      console.log('tototo', to)
      this.changePage({ to })
    }
  }
}
</script>

<style src="./style.scss" lang="scss" />