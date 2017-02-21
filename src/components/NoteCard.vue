<template lang="pug">
  .container.noselect(:id="'note-card-' + id", @click='toggle')
    .card(:class='"left-" + get_card_class()')
      .main
        h1 {{ note.label }}
        i.remove.icon(:class='expanded ? "shown" : ""', @click.self='remove')
      .comments(:class='expanded ? "shown" : ""', @click.stop='')
        edit-comment(v-model='desc')
        .sub-comments
          edit-comment(v-for='comment in comments', v-model='comment.content', :by='get_user(comment.by)')
          .add-comment(@click='add_comment')
            i.pencil.icon
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
      by: {},
      expanded: false
    }
  },
  mounted () {
    this.$container = $('#note-card-' + this.id)
    this.$card = this.$container.children('.card')

    this.desc     = this.note.desc
    this.by       = this.get_user(this.note.by)
    this.comments = this.note.comments || {}

    // this.$watch('comments', () => {
    //   this.update_note()
    // }, { deep: true })
  },
  watch: {
    comments () {
      this.update_note()
    }
  },
  methods: {
    get_user (passcode) {
      let users = window.localStorage.users
      if (!users) return { color: 0, name: '' }
      return JSON.parse(users)[passcode]
    },
    get_card_class () {
      return this.by.color || ((ls) => {
        if (!ls) return 0
        return JSON.parse(ls)[this.note.by].color
      })(window.localStorage.users)
    },
    update_note () {
      this.note.desc = this.desc
      this.note.comments = this.comments
      this.db.child(this.id).update(this.note)
      this.db.child(this.id + '/comments').update(this.comments)
    },
    toggle () {
      this.expanded = !this.expanded
    },
    remove () {

    },
    add_comment () {
      let key = this.db.child(this.id + '/comments').push().key
      this.comments[key] = {
        content: ' ',
        by: window.localStorage.user_passcode
      }
      console.log(key, this.comments[key])
      this.update_note()
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
  height: auto;

  .card {
    width: 100%;
    height: 100%;

    padding: 0.5em;

    position: relative;

    h1 {
      text-transform: lowercase;
      font-weight: lighter;
      text-align: left;
      margin: 9.8px;
    }

    i.remove.icon {
      position: absolute;
      right: -1.5em;
      top: 1em;
      font-size: 1.4em;
      color: $cherry;
      opacity: 0.5;

      text-shadow: $hard-shadow;
      transition: 0.5s;

      &.shown {
        right: 0.5em;
        cursor: pointer;

        &:active {
          opacity: 1;
        }
      }
    }

    .comments {
      opacity: 0;
      transition: 0.5s;
      max-height: 0;
      height: auto;
      overflow: hidden;
      z-index: -1;
      margin-top: 0;
      padding-bottom: .5em;

      &.shown {
        opacity: 1;
        max-height: 20em;
        z-index: 5;
        margin-top: 1em;
      }

      .add-comment {
        transition: 0.25s;
        text-align: right;

        i.pencil.icon {
          background: $ocean;
          color: $card-bg;
          text-shadow: $hard-shadow;
          box-shadow: $hard-shadow;
          border-radius: 100px;
          width: 30px;
          height: 30px;
          padding: 0.25em;
        }
      }
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
