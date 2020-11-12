<template>
  <div class="people-list-wrap">
    <div class="people-list__filter">
      <div class="people-list__filter-male">
        <input
          type="radio"
          id="male"
          name="male"
          value="male"
          v-model="gender"
        >
        <label for="male">Male</label>
        <input
          type="radio"
          id="female"
          name="female"
          value="female"
          v-model="gender"
        >
        <label for="female">Female</label>
        <input
          type="radio"
          id="na"
          name="na"
          value="n/a"
          v-model="gender"
        >
        <label for="na">N/A</label>
      </div>
    </div>
    <Table
      :table-columns="tableColumns"
      :people="filteredPeople"
    />
  </div>
</template>

<script>
import Table from '@/components/table'
import { mapGetters } from 'vuex'

export default {
  name: 'PeopleList',
  components: {
    Table
  },
  data () {
    return {
      tableColumns: [
        {
          title: 'по имени',
          value: 'name',
          sort: 'base'
        },
        {
          title: 'по дате',
          value: 'created',
          sort: 'date'
        }
      ],
      gender: null
    }
  },
  computed: {
    ...mapGetters('people', ['getPeople']),
    filteredPeople () {
      let list = this.getPeople

      if (this.gender) {
        list = list.filter((item) => {
          return item.gender === this.gender
        })
      }

      return list
    }
  }
}
</script>

<style src="./style.scss" lang="scss" />