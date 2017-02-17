<template lang="pug">
  .ui.tab.segment.bottom.attached
    ul
      shopping-item(v-for="item in itemList", :item="item")
</template>

<script>
import ShoppingItem from './ShoppingItem.vue'

export default {
  props: ['item-list'],
  components: {
    ShoppingItem
  }
}
</script>

<style lang="scss" scoped>
.ui.tab.segment.bottom.attached {
  padding: 0;
  margin: 0;
  ul {
    margin: 0;
  }
}
</style>
