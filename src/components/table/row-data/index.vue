<template>
  <div class="table-data">
    {{ rowData }}
  </div>
</template>

<script>
export default {
  name: 'TableRowData',
  props: {
    col: {
      type: Object,
      required: true
    },
    person: {
      type: Object,
      required: true
    }
  },
  computed: {
    rowData () {
      const value = this.person[this.col.value]

      if (this.col.value === 'created') {
        return this.$moment.utc(value).format('DD.MM.YYYY HH:mm:ss')
      }

      if (value === 'unknown') {
        return '-'
      }
      return value
    }
  }
}
</script>
