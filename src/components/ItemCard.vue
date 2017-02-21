<template lang="pug">
  .container.noselect(:id="'item-card-' + id", :class="(this.item.done ? 'done' : '') + (this.item.deleted ? ' deleted' : '')")
    .option.left
      i.checkmark.icon
    .option.right(:id="'ro-card-' + id")
      i.trash.outline.icon
    .card
      .main
        h1 {{ item.label }}
        p.short
          nobr {{ get_short_desc() }}
        p.long {{ item.desc }}
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
  props: ['id', 'item', 'db', 'delete-lock'],
  data () {
    return {
      expanded: false,
      dragging: false,
      by: {}
    }
  },
  mounted () {
    if (this.item && this.item.deleted) {
      // Clear items from the database if they are
      // marked to be deleted. Prevents weird visual
      // errors when removing items as soon as
      // they're deleted
      this.db.child(this.id).remove()
      console.log('pushing dead item ' + this.id)

      // No use initializing a deleted item.
      return
    }

    this.$container  = $('#item-card-' + this.id)
    this.$card       = this.$container.children('.card')
    this.$card_main  = this.$card.children('.main')
    this.$opt_left   = this.$container.children('.option.left')
    this.$opt_right  = this.$container.children('.option.right')

    let xval = 0

    let begin_drag = (e) => {
      xval = e.pageX || e.offsetX || e.originalEvent.targetTouches[0].clientX
      // Disable transitions so drag is responsive
      this.$card.css('transition', '0s')
      this.$opt_left.css('transition', '0s')
      this.$opt_right.css('transition', '0s')
    }

    let while_drag = (e) => {
      let xdiff = e.pageX || e.offsetX || e.originalEvent.targetTouches[0].clientX
      let dist = xdiff - xval

      // Ignore clicks or taps where the user
      // didn't mean to drag the card
      if (dist < 15 && dist > -15) return

      // Don't allow right swipes if the item
      // is already done
      if (dist > 0 && this.item.done) return

      this.dragging = true
      if (dist > 200 || xdiff > ($(window).width() - 5)) {
        dist = 200
        this.done()
        end_drag()
        return
      } else if (dist < -200 || xdiff < 5) {
        dist = -200
        this.trash()
      }

      this.$card.css('margin-left', dist + 'px')

      if (dist > 0) {
        this.$opt_left.css('width', (100 + dist / 2) + 'px')
        this.$card.css('margin-left', dist + 'px')
      } else {
        if (this.item.done) {
          this.$opt_left.css('left', dist + 'px')
        } else {
            this.$card.css('margin-left', dist + 'px')
        }
        this.$opt_right.css('width', (100 + -dist / 2) + 'px')
      }
    }

    let end_drag = () => {
      $(document).off('mousemove touchmove')

      this.$card.css('transition', '0.5s')
        .css('margin-left', '0px')

      this.$opt_left.css('transition', '0.5s')
        .css('width', '100px')
        .css('left', '0px')

      this.$opt_right.css('transition', '0.5s')
        .css('width', '100px')
      xval = 0
      setTimeout(() => {
        this.dragging = false
      }, 10)
    }

    this.$card.on('mousedown touchstart', (e) => {
      if (this.expanded) return
      begin_drag(e)
      $(document).on('mousemove touchmove', while_drag)
      $(document).on('mouseup touchend', end_drag)
    })

    this.$container.on('click tap', (e) => {
      if (this.dragging) return
      if (this.expanded) {
        this.$container.removeClass('tall')
        this.expanded = false
      } else {
        if (this.has_long_desc()) {
          this.$container.addClass('tall')
          this.expanded = true
        }
      }
    })

    this.update_by()
  },
  data () {
    return {
      a: []
    }
  },
  computed: {
    isExpanded () {
      return this.expanded
    }
  },
  methods: {
    update_by () {
      if (!window.localStorage.users) return
      let users = JSON.parse(window.localStorage.users)
      this.by = users[this.item.by]
      this.$card
        .removeClass('left-1')
        .removeClass('left-2')
        .removeClass('left-3')
        .removeClass('left-4')
        .removeClass('left-5')
        .addClass('left-' + this.by.color)
    },
    has_long_desc () {
      return this.item.desc && this.item.desc.length > 35
    },
    get_short_desc () {
      if (this.expanded)
        return this.item.desc
      if (this.item.desc === '')
        return ''
      if (this.has_long_desc())
        return this.item.desc.substr(0, 35) + '...'
      return this.item.desc
    },
    done () {
      this.item.done = true
      this.$container.addClass('done')
      this.$opt_left.css('transition', '0.5s')
      this.db.child(this.id).update(this.item)
    },
    trash () {
      if (this.deleteLock.locked || this.item.deleted) return
      this.deleteLock.locked = true
      this.item.done = false
      this.item.deleted = true
      this.db.child(this.id).update(this.item)
      this.$container.addClass('deleted')
      setTimeout(() => {
        // this.db.ref('items/' + this.id).remove()
        this.deleteLock.locked = false
      }, 1000)
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
  color: $goldfish;
  font-size: 1.4em;
  height: 5em;
  transition: 0.25s;

  position: relative;

  .card {
    width: 100%;
    background: $card-bg;
    position: absolute;
    height: 100%;
    padding: 1em;
    transition: 1s;

    @include noselect;

    overflow: hidden;

    .main {
      transition: 0.5s;
    }

    h1 {
      text-align: left;
      text-transform: lowercase;
      margin-bottom: 0;
      vertical-align: middle;
      font-weight: lighter;
    }

    p {
      text-align: left;
      color: #CCC;
      font-weight: lighter;
      font-size: 0.8em;
      margin-bottom: 0;
      transition: 1s;

      position: absolute;
    }

    p.long {
      opacity: 0;
    }
  }

  &.deleted {
    opacity: 0 !important;
    z-index: -100;
    margin-bottom: -5em;
  }

  &.tall {
    height: 10em;

    .card {
      border-bottom-color: $card-lgray;

      p.short {
        opacity: 0;
      }

      p.long {
        opacity: 1;
        transition: 0.1s;
      }
    }
  }

  &:active {
    .card {
      background: #EEE;
    }
  }

  .option {
    height: 100%;
    position: absolute;
    top: 0;
    width: 100px;
    font-size: 2em;

    i {
      transform: translateY(100%);
      text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
    }

    &.left {
      color: white;
      background: $apple;
      box-shadow: $tab-shadow;
      left: 0;
    }

    &.right {
      color: white;
      background: $cherry;
      box-shadow: $tab-shadow;
      right: 0;
    }
  }

  &.done {
    .card {
      background: $card-lgray;

      h1, p {
        text-decoration: line-through;
        color: white;
      }

      .main {
        margin-left: 80px;
      }
    }

    .left {
      background: transparent;
      z-index: 2;
      box-shadow: none;
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
