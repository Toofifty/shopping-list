<template lang='pug'>
  #items-list-container.ui.tab.top.attached.loading
    #empty-list.ui.container(:class='has_items ? "" : "shown"')
      h1 there's nothing here :o
    ul
      item-card(v-for='(item, id) in items', :item='item', :id='id', :db='db_items', :delete-lock='delete_lock')
    .button-clear
    button.circular.ui.icon.button.massive.primary(@click='show_add')
      i.icon.plus
    add-item#add-item(:db='db_items')
</template>

<script>
import ItemCard from './ItemCard.vue'
import AddItem from './AddItem.vue'

export default {
  props: ['db'],
  components: {
    ItemCard,
    AddItem
  },
  data () {
    return {
      items: [],
      db_items: this.db.ref('items/'),
      // used to prevent multiple deletes from one action
      delete_lock: {
        locked: false
      }
    }
  },
  mounted () {
    if (false) {
      this.db_items.on('value', (v) => {
        this.items = v.val()
        $('#items-list-container').removeClass('loading')
      })
    } else {
      // Test (local) mode
      this.items = {
        "bread-1423": {
          label: "bread",
          desc: "Buy some bread",
          done: false,
          deleted: false,
          by: {
            name: "Matho",
            color: "1"
          }
        },
        "bread-142315": {
          label: "bread-1",
          desc: "Buy some bread with a very long and unnecessary description, because I need to test how such a description would look both functionally and aesthetically",
          done: false,
          deleted: false,
          by: {
            name: "Matho",
            color: "2"
          }
        },
        "bread-14232": {
          label: "bread-2",
          desc: "Buy some bread",
          done: false,
          deleted: false,
          by: {
            name: "Matho",
            color: "3"
          }
        },
        "bread-14231": {
          label: "bread-3",
          desc: "Buy some bread",
          done: false,
          deleted: false,
          by: {
            name: "Matho",
            color: "4"
          }
        },
        "bread-142311": {
          label: "bread-4",
          desc: "Buy some bread",
          done: false,
          deleted: false,
          by: {
            name: "Matho",
            color: "5"
          }
        },
        "bread-142321": {
          label: "bread-5",
          desc: "Buy some bread",
          done: false,
          deleted: false,
          by: {
            name: "Matho",
            color: "2"
          }
        }
      }
      setTimeout(() => {
        $('#items-list-container').removeClass('loading')
      }, 500)
    }
  },
  computed: {
    has_items () {
      for (let key in this.items) {
        if (!this.items[key].deleted) return true
      }
      return false
    }
  },
  methods: {
    show_add () {
      $('#add-item').modal('show')
      $('#items-list-container button').addClass('hidden')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/_variables.scss';

#items-list-container {
  padding: 0;
  margin: 0;
  max-height: calc(100vh - 71px);
  overflow-y: scroll;
  overflow-x: hidden;

  ul { margin: 0; }
  .button-clear { height: 98px; }
}

#empty-list {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  padding: 5%;
  margin: 5%;
  color: $slate;
  border-radius: 4px;
  opacity: 0;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);

  &.shown { opacity: 1; }
}

button.circular.ui.icon.button {
  position: fixed;
  bottom: 92px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $ocean;
  box-shadow: $hard-shadow;

  i {
    animation: button-spin-in-left 1s;
    text-shadow: $hard-shadow;
  }

  &:active { background-color: $apple; }
}

@keyframes button-spin-in-left {
  0% {
    text-shadow: $hard-shadow;
  }
  10% {
    transform: rotate(0deg);
    text-shadow: $no-shadow;
  }
  50% {
    transform: rotate(-360deg);
    text-shadow: $no-shadow;
  }
  100% {
    transform: rotate(-360deg);
    text-shadow: $hard-shadow;
  }
}
</style>
