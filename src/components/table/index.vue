<template>
  <div class="table">
    <div class="table-header">
      <div
        v-for="(column, key) in tableColumns"
        :key="key"
        class="header__item"
      >
        <div
          :class="[
            'filter__link',
            selectedFilter.field === column.value ? directionClass : ''
          ]"
          @click="sort(column.value, column.sort)"
        >{{ column.title }}</div>
      </div>
    </div>
    <div v-if="noPeople">Нет данных с выбранными фильтрами</div>
    <div v-else-if="getIsDataLoading">Загрузка...</div>
    <div v-else class="table-content">
      <div
        v-for="(person, key) in filteredPeople"
        :key="key"
        class="table-row"
      >
        <row-data
          v-for="(col, key) in tableColumns"
          :key="key"
          :col="col"
          :person="person"
          class="table-data"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RowData from './row-data'
import { mapGetters } from 'vuex'
export default {
  name: 'table',
  components: {
    RowData
  },
  props: {
    tableColumns: {
      type: Array,
      required: true
    },
    people: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedFilter: {
        field: null,
        direction: 1
      }
    }
  },
  computed: {
    ...mapGetters('people', ['getIsDataLoading', 'noPeople']),
    directionClass () {
      return this.selectedFilter.direction < 0 ? 'desc' : 'asc'
    },
    filteredPeople () {
      const list = [...this.people]
      const field = this.selectedFilter && this.selectedFilter.field
      if (field) {
        switch (this.selectedFilter.type) {
          case 'string':
            list.sort((a, b) => {
              return (a[field]).localeCompare(b[field]) * this.selectedFilter.direction
            })
            break;
          case 'number':
            list.sort((a, b) => {
              const aValue = +a[field] || 0
              const bValue = +b[field] || 0

              return (aValue - bValue) * this.selectedFilter.direction
            })
            break;
          case 'date':
            list.sort((a, b) => {
              return (new Date(a[field]) - new Date(b[field])) * this.selectedFilter.direction
            })
            break;
        }
      }

      return list
    }
  },
  methods: {
    sort (filter, sortType) {
      this.selectedFilter = {
        field: filter,
        type: sortType,
        direction: -this.selectedFilter.direction
      }
    }
  }
}
</script>

<style src="./style.scss" lang="scss" />
