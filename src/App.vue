<template lang="pug">
  #app
    .ui.three.item.labeled.icon.menu.top.attached
      a.item.active(data-tab='shop')
        i.shopping.basket.icon
        | Shopping List
      a.item(data-tab='note')
        i.book.icon
        | Notes
      a.item(data-tab='settings')
        i.setting.icon
        | Settings
    shopping-list.active(data-tab='shop', :item-list='items')
    .ui.tab.segment.bottom.attached(data-tab='note')
      p Cats
      p Aren't
      p Cool
</template>

<script>
import ShoppingList from './components/ShoppingList.vue'

export default {
  name: 'app',
  components: {
    ShoppingList
  },
  mounted() {
    $('.menu .item').tab()
  },
  data () {
    return {
      items: [
        {
          label: "bread",
          id: 1
        },
        {
          label: "butter",
          id: 2
        }
      ]
    }
  }
}
</script>

<style lang="scss">

// palette http://www.colourlovers.com/palette/1930/cheer_up_emo_kid

$aoi: #69D2E7;
$pondwater: #A7DBD8;
$goldfish: #F38630;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.ui.icon.menu a.item.active,
.ui.menu .item.active > i.icon {
  color: $aoi;
}
.ui.icon.menu a.item,
.ui.menu .item > i.icon {
  color: $pondwater;
  &:hover {
    color: $pondwater;
  }
}
</style>
