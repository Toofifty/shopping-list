<template lang="pug">
  .container.noselect(:id="'note-card-' + id", :class="(this.note.done ? 'done' : '') + (this.note.deleted ? ' deleted' : '')")
    .option.left
      i.write.icon
    .option.right(:id="'ro-card-' + id")
      i.trash.outline.icon
    .card
      .main
        h1(:class="note.desc ? 'full-height' : ''") {{ note.label }}
        p.short {{ get_short_desc() }}
        p.long {{ note.desc }}
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
  props: ['id', 'note', 'db', 'delete-lock'],
  data () {
    return {
      expanded: false,
      dragging: false
    }
  },
  mounted () {
    if (this.note && this.note.deleted) {
      // Clear notes from the database if they are
      // marked to be deleted. Prevents weird visual
      // errors when removing notes as soon as
      // they're deleted
      this.db.child(this.id).remove()
      console.log('pushing dead note ' + this.id)

      // No use initializing a deleted note.
      return
    }

    console.log('initializing note ' + this.id)

    this.$container  = $('#note-card-' + this.id)
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

      // Don't allow right swipes if the note
      // is already done
      if (dist > 0 && this.note.done) return

      this.dragging = true
      if (dist > 200 || xdiff > ($(window).width() - 5)) {
        dist = 200
        this.edit()
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
        if (this.note.done) {
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

    this.$container.addClass('preanim')

    console.log(this.$container.length)

    setTimeout(() => {
      this.$container.removeClass('preanim')
        .css('border-bottom-color', colors[this.note.by.color])
    }, 200)

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
    has_long_desc () {
      return this.note.desc && this.note.desc.length > 35
    },
    get_short_desc () {
      if (this.expanded)
        return this.note.desc
      if (this.note.desc === '')
        return ''
      if (this.has_long_desc())
        return this.note.desc.substr(0, 35) + '...'
      return this.note.desc
    },
    edit () {
      console.log('edit!')
      this.$opt_left.css('transition', '0.5s')
      
    },
    trash () {
      if (this.deleteLock.locked || this.note.deleted) return
      this.deleteLock.locked = true
      console.log('trashed!')
      this.note.deleted = true
      this.db.child(this.id).update(this.note)
      this.$container.addClass('deleted')
      setTimeout(() => {
        // this.db.ref('notes/' + this.id).remove()
        this.deleteLock.locked = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

$aoi: #69D2E7;
$pondwater: #A7DBD8;
$goldfish: #F38630;
$apple: #C7F464;
$cherry: #FF6B6B;

$tabshadow: inset 0 -8px 0 rgba(0, 0, 0, 0.1);

.container {
  margin: 0;
  color: $goldfish;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.4em;
  font-weight: bolder;
  transition: 0s;
  height: 5em;
  position: relative;
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 4px solid #d4d4d5;
  opacity: 1;
  transition: 0.5s;

  &.preanim {
    transform: translateY(50%);
    opacity: 0;
  }

  &.deleted {
    opacity: 0.5;
    z-index: -100;
    margin-bottom: -5em;
  }

  &.tall {
    height: 10em;

    .card {
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

  .card {
    width: 100%;
    background: white;
    // border: 1px solid #d4d4d5;
    position: absolute;
    height: 100%;
    padding: 1em;
    transition: 1s;

    .main {
      transition: 0.5s;
    }

    h1 {
      text-align: left;
      text-transform: lowercase;
      margin-bottom: 0;
      vertical-align: middle;
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

  .option {
    height: 100%;
    position: absolute;
    top: 0;
    width: 100px;
    font-size: 2em;

    i {
      transform: translateY(100%);
    }
    &.left {
      color: white;
      background: $aoi;
      box-shadow: $tabshadow;
      left: 0;
    }
    &.right {
      color: white;
      background: $cherry;
      box-shadow: $tabshadow;
      right: 0;
    }

    i {
      text-shadow: 0 4px 0 rgba(0, 0, 0, 0.1);
    }
  }
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
