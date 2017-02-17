<template lang="pug">
  .ui.tab.top.attached
    ul
      shopping-item(v-for="(item, id) in items", :item="item", :id="id", :db="db", :delete-lock="delete_lock")
</template>

<script>
import ShoppingItem from './ShoppingItem.vue'

export default {
  props: ['db'],
  data () {
    return {
      items: [],
      db_items: this.db.ref('items/'),
      delete_lock: {
        locked: false
      }
    }
  },
  mounted () {
    this.db_items.on('value', (v) => {
      this.items = v.val()
    })
  },
  components: {
    ShoppingItem
  }
}
</script>

<style lang="scss" scoped>
.ui.tab.top.attached {
  padding: 0;
  margin: 0;
  max-height: calc(100vh - 72px);
  overflow-y: scroll;
  overflow-x: hidden;
  ul {
    margin: 0;
  }
}
</style>
