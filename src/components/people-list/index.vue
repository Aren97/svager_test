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
          class="people-list__filter-button"
          @click="submitSearch"
        >Поиск</button>
      </div>
      <div class="people-list__filter-reset">
        <button
          class="people-list__filter-button"
          @click="resetFilters"
        >Сброс</button>
      </div>
    </div>
    <Table
      :table-columns="tableColumns"
      :people="filteredPeople"
    />
    <Pagination v-if="!noPeople"/>
  </div>
</template>

<script>
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PeopleList',
  components: {
    Table,
    Pagination
  },
  data () {
    return {
      searchNameValue: '',
      tableColumns: [
        {
          title: 'по имени',
          value: 'name',
          sort: 'string'
        },
        {
          title: 'по росту',
          value: 'height',
          sort: 'number'
        },
        {
          title: 'по весу',
          value: 'mass',
          sort: 'number'
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
    ...mapGetters('people', { people: 'getPeople', noPeople: 'noPeople' }),
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
      this.getPeople({ search: this.searchNameValue })
    },
    resetFilters () {
      this.gender = null
      this.searchNameValue = ''
      this.getPeople()
    }
  }
}
</script>

<style src="./style.scss" lang="scss" />
