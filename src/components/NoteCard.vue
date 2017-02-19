<template lang="pug">
  .container.noselect(:id="'note-card-' + id", @click='toggle')
    .card
      .main
        h1 {{ note.label }}
      form.ui.form.extra
        .editable
          h6(@click='') {{ note.desc }}
          .field
            textarea(:value='note.desc')
</template>

<script>
const colors = {
  1: '#69D2E7',
  2: '#A7DBD8',
  3: '#E0E4CC',
  4: '#F38630',
  5: '#FA6900'
}

export default {
  props: ['id', 'note', 'db'],
  data () {
    return {
    }
  },
  mounted () {
    this.$container = $('#note-card-' + this.id)

    this.$container.addClass('bottom-' + this.note.by.color)

    this.$card = this.$container.children('.card')
    this.$extra = this.$card.children('form.ui.form.extra')
  },
  data () {
    return {
      a: []
    }
  },
  computed: {
  },
  methods: {
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
  font-weight: bolder;
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

    .extra {
      height: 0;
      overflow: hidden;
    }

    h1, h6 {
      text-align: left;
      margin-bottom: 0;
    }

    h1 { text-transform: lowercase; }

    h6 {
      color: $card-gray;
      font-size: 0.8em;
      font-weight: lighter;
    }
  }
}

[class*='bottom-'] { border-bottom: 4px solid $card-gray; }
.bottom-1 { border-bottom-color: #69D2E7; }
.bottom-2 { border-bottom-color: #A7DBD8; }
.bottom-3 { border-bottom-color: #E0E4CC; }
.bottom-4 { border-bottom-color: #F38630; }
.bottom-5 { border-bottom-color: #FA6900; }
</style>
