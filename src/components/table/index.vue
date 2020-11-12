<template>
  <div class="table">
    {{selectedFilter}}
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
    <div class="table-content">
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
    directionClass () {
      return this.selectedFilter.direction < 0 ? 'desc' : 'asc'
    },
    filteredPeople () {
      const list = [...this.people]
      const field = this.selectedFilter && this.selectedFilter.field
      if (field) {
        if (this.selectedFilter.type === 'base') {
          list.sort((a, b) => {
            if (typeof a[field] === 'string' || typeof b[field] === 'string') {
              return (a[field] > b[field]) * this.selectedFilter.direction
            }
            return (a[field] - b[field]) * this.selectedFilter.direction
          })
        } else {
          if (this.selectedFilter.type === 'date') {
            list.sort((a, b) => {
              return (new Date(a[field]) - new Date(b[field])) * this.selectedFilter.direction
            })
          }
        }
      }
      console.log('list', list)

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