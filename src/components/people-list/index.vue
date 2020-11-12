<template>
  <div class="people-list-wrap">
    <div class="people-list__filter">
      <div class="people-list__filter-gender">
        <span>Фильтрация по полу</span>
        <div class="people-list__filter-gender-inner">
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
      <div class="people-list__filter-search">
        <div class="people-list__filter-search__label">Поиск по имени</div>
        <input
          v-model="searchNameValue"
          type="text"
          placeholder="Имя"
          class="people-list__filter-search__input"
        >
        <button
          class="people-list__filter-search__button"
          @click="submitSearch"
        >Поиск</button>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PeopleList',
  components: {
    Table
  },
  data () {
    return {
      searchNameValue: '',
      tableColumns: [
        {
          title: 'по имени',
          value: 'name',
          sort: 'base'
        },
        {
          title: 'по росту',
          value: 'height',
          sort: 'base'
        },
        {
          title: 'по весу',
          value: 'mass',
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
    ...mapGetters('people', { people: 'getPeople' }),
    filteredPeople () {
      let list = this.people

      if (this.gender) {
        list = list.filter((item) => {
          return item.gender === this.gender
        })
      }

      return list
    }
  },
  methods: {
    ...mapActions('people', ['getPeople']),
    submitSearch () {
      this.getPeople(this.searchNameValue)
    }
  }
}
</script>

<style src="./style.scss" lang="scss" />