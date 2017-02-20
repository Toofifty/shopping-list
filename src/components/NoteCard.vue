<template lang="pug">
  .container.noselect(:id="'note-card-' + id", @click='toggle')
    .card
      .main
        h1 {{ note.label }}
      .comments
        edit-comment(v-model='desc')
        p {{ desc }}
</template>

<script>
import EditComment from './EditComment.vue'

const colors = {
  1: '#69D2E7',
  2: '#A7DBD8',
  3: '#E0E4CC',
  4: '#F38630',
  5: '#FA6900'
}

export default {
  props: ['id', 'note', 'db'],
  components: {
    EditComment
  },
  data () {
    return {
      desc: '',
      comments: {},
      by: {}
    }
  },
  mounted () {
    this.$container = $('#note-card-' + this.id)

    this.$card = this.$container.children('.card')
    this.$extra = this.$card.children('form.ui.form.extra')

    this.desc     = this.note.desc
    this.by       = this.note.by
    this.comments = this.note.comments

    this.update_by()
  },
  methods: {
    update_by () {
      if (!window.localStorage.users) return
      let users = JSON.parse(window.localStorage.users)
      this.by = users[this.note.by]
      this.$card
        .removeClass('left-1')
        .removeClass('left-2')
        .removeClass('left-3')
        .removeClass('left-4')
        .removeClass('left-5')
        .addClass('left-' + this.by.color)
    },
    update_note () {
      this.note.desc = this.desc
      this.note.comments = this.comments
      this.db.child(this.id).update(this.note)
    },
    toggle () {
      console.log('toggle')
      if (this.$container.hasClass('expanded')) {
        this.$container.removeClass('expanded')
      } else {
        this.$container.addClass('expanded')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';

.container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  animation: $fade-in-anim;
  background: $card-bg;
  color: $goldfish;
  font-size: 1.4em;
  height: 5em;

  .expanded {
    .card {
      .extra {
        height: auto;
      }
    }
  }

  .card {
    width: 100%;
    height: 100%;

    padding: 1em;

    h1 {
      text-transform: lowercase;
      font-weight: lighter;
      text-align: left;
    }
  }
}

[class*='left-'] { border-left: 4px solid $card-gray; }
.left-1 { border-left-color: #69D2E7; }
.left-2 { border-left-color: #A7DBD8; }
.left-3 { border-left-color: #E0E4CC; }
.left-4 { border-left-color: #F38630; }
.left-5 { border-left-color: #FA6900; }
</style>
