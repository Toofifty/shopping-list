<template lang="pug">
  #app
    .ui.three.item.labeled.icon.menu.bottom.fixed
      a.item.active(data-tab='shop')
        i.shopping.basket.icon
        //- | Shopping List
      a.item(data-tab='note')
        i.book.icon
        //- | Notes
      a.item(data-tab='settings')
        i.setting.icon
        //- | Settings
    items-list.active(data-tab='shop', :db='db', :uservalid='uservalid')
    notes-list(data-tab='note', :db='db', :uservalid='uservalid')
    settings-list(data-tab='settings', :db='db', @validchange='set_valid')
</template>

<script>
import ItemsList from './components/ItemsList.vue'
import NotesList from './components/NotesList.vue'
import SettingsList from './components/SettingsList.vue'
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

window.local_user_valid = false
db.ref('users/').on('value', (v) => {
  window.localStorage.users = JSON.stringify(v.val())
})

export default {
  name: 'app',
  components: {
    ItemsList,
    NotesList,
    SettingsList
  },
  mounted() {
    $('.menu .item').tab()
  },
  data () {
    return {
      db: db,
      uservalid: false
    }
  },
  methods: {
    set_valid (value) {
      this.uservalid = value
      console.log('change valid to ' + this.uservalid)
    }
  }
}
</script>

<style lang="scss">

// palette http://www.colourlovers.com/palette/1930/cheer_up_emo_kid

@import './assets/_variables.scss';

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

.ui.icon.menu a.item {
  color: $slate;
  &:hover, &:active {
    color: $ocean;
  }
}

// .ui.icon.menu a.item.active,
// .ui.menu .item.active > i.icon {
//   color: #f0f;
// }
// .ui.icon.menu a.item,
// .ui.menu .item > i.icon {
//   color: $pondwater;
// }
</style>
