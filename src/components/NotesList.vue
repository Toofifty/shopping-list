<template lang="pug">
  #notes-list-container.ui.tab.top.attached.loading
    #empty-list.ui.container(:class='has_notes ? "" : "shown"')
      h1 there's nothing here :o
    ul
      note-card(v-for='(note, id) in notes', :note='note', :id='id', :db='db_notes')
    .button-clear
    button.circular.ui.icon.button.massive.primary(v-if='uservalid', @click='show_add')
      i.icon.plus
    add-note#add-note(:db='db_notes')
</template>

<script>
import NoteCard from './NoteCard.vue'
import AddNote from './AddNote.vue'

export default {
  props: ['db', 'uservalid'],
  components: {
    NoteCard,
    AddNote
  },
  data () {
    return {
      notes: [],
      db_notes: this.db.ref('notes2/')
    }
  },
  mounted () {
    if (true) {
      this.db_notes.on('value', (v) => {
        this.notes = v.val()
        $('#notes-list-container').removeClass('loading')
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
          },
          comments: {
            "comment-1": {
              content: "This is a comment",
              by: {
                name: "Matho",
                color: "3"
              }
            }
          }
        },
        "note-14231": {
          label: "note 2",
          desc: "This is another note",
          deleted: false,
          by: {
            name: "Matho",
            color: "4"
          },
          comments: {
            "comment-1": {
              content: "This is a comment",
              by: {
                name: "Matho",
                color: "3"
              }
            }
          }
        }
      }
      setTimeout(() => {
        $('#notes-list-container').removeClass('loading')
      }, 500)
    }
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
      $('#notes-list-container button').addClass('hidden')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

#notes-list-container {
  padding: 0;
  margin: 0;
  max-height: calc(100vh - 56px);
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
  bottom: 77px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $ocean;
  box-shadow: $hard-shadow;

  i {
    animation: button-spin-in-right 1s;
    text-shadow: $hard-shadow;
  }

  &:active { background-color: $apple; }
}

note-card:last-child {
  border-bottom: 10px solid red;
}

@keyframes button-spin-in-right {
  0% {
    text-shadow: $hard-shadow;
  }
  10% {
    transform: rotate(0deg);
    text-shadow: $no-shadow;
  }
  50% {
    transform: rotate(360deg);
    text-shadow: $no-shadow;
  }
  100% {
    transform: rotate(360deg);
    text-shadow: $hard-shadow;
  }
}
</style>
