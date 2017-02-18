<template lang="pug">
  #notes-container.ui.tab.top.attached.loading
    #empty-list.ui.container(:class='has_notes ? "" : "shown"')
      h1 there's nothing here :o
    ul
      note(v-for='(note, id) in notes', :note='note', :id='id', :db='db_notes', :delete-lock='delete_lock')
    button.circular.ui.icon.button.massive.primary(@click='show_add')
      i.icon.plus
    add-note#add-note(:db='db_notes', type='New')
</template>

<script>
import Note from './Note.vue'
import AddNote from './AddNote.vue'

export default {
  props: ['db'],
  data () {
    return {
      notes: [],
      db_notes: this.db.ref('notes/'),
      // used to prevent multiple deletes from one action
      delete_lock: {
        locked: false
      }
    }
  },
  mounted () {
    if (true) {
      this.db_notes.on('value', (v) => {
        this.notes = v.val()
        $('#notes-container').removeClass('loading')
      })
    } else {
      // Test (local) mode
      this.notes = {
        "note-1423": {
          label: "note 1",
          desc: "This is a note",
          deleted: false,
          by: {
            name: "Matho",
            color: "2"
          }
        },
        "note-14231": {
          label: "note 2",
          desc: "This is another note",
          deleted: false,
          by: {
            name: "Matho",
            color: "4"
          }
        }
      }
      setTimeout(() => {
        $('#notes-container').removeClass('loading')
      }, 500)
    }
  },
  components: {
    Note,
    AddNote
  },
  computed: {
    has_notes () {
      for (let key in this.notes) {
        if (!this.notes[key].deleted) return true
      }
      return false
    }
  },
  methods: {
    show_add () {
      $('#add-note').modal('show')
    }
  }
}
</script>

<style lang="scss" scoped>
#notes-container {
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
    animation: button-spin-in-right 1s;
    text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #C7F464;
  }

}

@keyframes button-spin-in-right {
  0% {
    text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  }
  10% {
    transform: rotate(0deg);
    text-shadow: 0 0px 0 rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: rotate(360deg);
    text-shadow: 0 0px 0 rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: rotate(360deg);
    text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
