<template lang="pug">
  #shopping-list-container.ui.tab.top.attached.loading
    #empty-list.ui.container(:class='has_items ? "" : "shown"')
      h1 there's nothing here :o
    ul
      shopping-item(v-for='(item, id) in items', :item='item', :id='id', :db='db_items', :delete-lock='delete_lock')
    button.circular.ui.icon.button.massive.primary(@click='show_add')
      i.icon.plus
    add-shopping-item#add-item(:db='db_items')
</template>

<script>
import ShoppingItem from './ShoppingItem.vue'
import AddShoppingItem from './AddShoppingItem.vue'

export default {
  props: ['db'],
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
    if (true) {
      this.db_items.on('value', (v) => {
        this.items = v.val()
        $('#shopping-list-container').removeClass('loading')
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
            color: "4"
          }
        },
        "bread-14231": {
          label: "bread-1",
          desc: "Buy some bread",
          done: false,
          deleted: false,
          by: {
            name: "Matho",
            color: "4"
          }
        },
        "bread-14232": {
          label: "bread-2",
          desc: "Buy some bread",
          done: false,
          deleted: false,
          by: {
            name: "Matho",
            color: "4"
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
            color: "4"
          }
        },
        "bread-142321": {
          label: "bread-5",
          desc: "Buy some bread",
          done: false,
          deleted: false,
          by: {
            name: "Matho",
            color: "4"
          }
        }
      }
      setTimeout(() => {
        $('#shopping-list-container').removeClass('loading')
      }, 500)
    }
  },
  components: {
    ShoppingItem,
    AddShoppingItem
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
    }
  }
}
</script>

<style lang="scss" scoped>
#shopping-list-container {
  padding: 0;
  margin: 0;
  max-height: calc(100vh - 71px);
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  ul {
    margin: 0;
  }
}
#empty-list {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  margin: 0;
  width: 100%;
  padding: 5%;
  margin: 5%;
  color: #556270;
  border-radius: 4px;
  opacity: 0;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  &.shown {
    opacity: 1;
  }
}
button.circular.ui.icon.button {
  position: absolute;
  bottom: 92px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4ECDC4;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);

  i {
    animation: button-spin-in-left 1s;
    text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #C7F464;
  }
}

@keyframes button-spin-in-left {
  0% {
    transform: rotate(0deg);
    text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  }
  10% {
    transform: rotate(0deg);
    text-shadow: 0 0px 0 rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: rotate(-360deg);
    text-shadow: 0 0px 0 rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: rotate(-360deg);
    text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
