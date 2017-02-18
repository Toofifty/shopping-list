<template lang="pug">
  #app
    .ui.three.item.labeled.icon.menu.bottom.fixed
      a.item.active(data-tab='shop')
        i.shopping.basket.icon
        | Shopping List
      a.item(data-tab='note')
        i.book.icon
        | Notes
      a.item(data-tab='settings')
        i.setting.icon
        | Settings
    shopping-list.active(data-tab='shop', :db='db')
    .ui.tab.top.attached(data-tab='note')
      p Cats
      p Aren't
      p Cool
</template>

<script>
import ShoppingList from './components/ShoppingList.vue'
import firebase from 'firebase'

// Initialize the Firebase connection
const fb_app = firebase.initializeApp({
  apiKey: "AIzaSyCe18jPwJLMI5TPhHy8CnkvdduB4vh1AWw",
  authDomain: "shopping-list-7217b.firebaseapp.com",
  databaseURL: "https://shopping-list-7217b.firebaseio.com",
  storageBucket: "shopping-list-7217b.appspot.com",
  messagingSenderId: "316745592013"
})

// Grab the database reference from Firebase
const db = fb_app.database()
//
// const db_items = db.ref('items/')
//
// const k = db_items.push().key
// const k2 = db_items.push().key
//
// let data = {}
// data[k] = {
//   label: k.substr(0, 10),
//   done: false,
//   desc: "",
//   date: "18/02",
//   deleted: false,
//   by: {
//     name: "Matho",
//     color: "1"
//   }
// }
// data[k2] = {
//   label: k2.substr(0, 10),
//   done: false,
//   desc: "",
//   date: "18/02",
//   deleted: false,
//   by: {
//     name: "Sam",
//     color: "5"
//   }
// }
//
// db_items.update(data)

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
      db: db
    }
  }
}
</script>

<style lang="scss">

// palette http://www.colourlovers.com/palette/1930/cheer_up_emo_kid

$aoi: #69D2E7;
$pondwater: #A7DBD8;
$goldfish: #F38630;

body {
  background: #556270 !important;
}

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
