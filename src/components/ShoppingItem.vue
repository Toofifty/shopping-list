<template lang="pug">
  .container.noselect(:id="'item-card-' + id", :class="(this.item.done ? 'done' : '') + (this.item.deleted ? ' deleted' : '')")
    .option.left
      i.checkmark.icon
    .option.right(:id="'ro-card-' + id")
      i.trash.outline.icon
    .card
      .main
        h1(:class="item.desc ? 'full-height' : ''") {{ item.label }}
        p.short {{ getShortDesc() }}
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
      dragging: false
    }
  },
  mounted () {
    if (this.item.deleted) {
      this.db.ref('items/' + this.id).remove()
      return
    }

    let $card = $('#item-card-' + this.id + ' .card')
    let $lo = $('#item-card-' + this.id + ' .option.left')
    let $ro = $('#item-card-' + this.id + ' .option.right')
    let xval = 0
    let vm = this

    let beginDrag = (e) => {
      xval = e.pageX || e.offsetX || e.originalEvent.targetTouches[0].clientX
      $card.css('transition', '0s')
      $lo.css('transition', '0s')
      $ro.css('transition', '0s')
    }

    let dragMove = (e) => {
      let xdiff = e.pageX || e.offsetX || e.originalEvent.targetTouches[0].clientX
      let dist = xdiff - xval
      if (dist < 15 && dist > -15) return
      vm.dragging = true
      if (dist > 200 || xdiff > ($(window).width() - 5)) {
        dist = 200
        vm.markDone()
        endDrag()
      } else if (dist < -200 || xdiff < 5) {
        dist = -200
        vm.markTrashed()
        endDrag()
      }
      $card.css('margin-left', dist + 'px')
      if (dist > 0) {
        $lo.css('width', (100 + dist / 2) + 'px')
      } else {
        $ro.css('width', (100 + -dist / 2) + 'px')
      }

      if (vm.item.done && dist > 0) {
        endDrag()
      }
    }

    let endDrag = () => {
      $card.off('mousemove touchmove')
        .css('transition', '0.5s')
        .css('margin-left', this.item.done ? '80px' : '0px')

      $lo.css('transition', '0.5s')
        .css('width', '100px')

      $ro.css('transition', '0.5s')
        .css('width', '100px')
      xval = 0
      setTimeout(() => {
        vm.dragging = false
      }, 10)
    }

    $card.on('mousedown touchstart', (e) => {
      if (vm.expanded) return
      beginDrag(e)
      $card.on('mousemove touchmove', dragMove)
        .on('mouseup touchend', endDrag)
    })

    let $container = $('#item-card-' + vm.id)
    $container.addClass('preanim')
      .css('border-bottom-color', colors[vm.item.by.color])

    setTimeout(() => {
      $container.removeClass('preanim')
        .css('border-bottom-color', colors[vm.item.by.color])
    }, 200)

    $container.on('click tap', (e) => {
      if (vm.dragging) return
      if (vm.expanded) {
        $container.removeClass('tall')
        vm.expanded = false
      } else {
        if (vm.hasLongDesc()) {
          $container.addClass('tall')
          vm.expanded = true
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
    hasLongDesc () {
      return this.item.desc && this.item.desc.length > 35
    },
    getShortDesc () {
      if (this.expanded)
        return this.item.desc
      if (this.item.desc === '')
        return ''
      if (this.hasLongDesc())
        return this.item.desc.substr(0, 35) + '...'
      return this.item.desc
    },
    markDone () {
      console.log('done!')
      this.item.done = true
      $('#item-card-' + this.id)
        .addClass('done')
        .children('.left.option')
        .css('transition', '0.5s')
      this.db.ref('items/' + this.id).update(this.item)
    },
    markTrashed () {
      if (this.deleteLock.locked || this.item.deleted) return
      this.deleteLock.locked = true
      console.log('trashed!')
      this.item.done = false
      this.item.deleted = true
      this.db.ref('items/' + this.id).update(this.item)
      $('#item-card-' + this.id).addClass('deleted')
      setTimeout(() => {
        // this.db.ref('items/' + this.id).remove()
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
    height: 15em;

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

    h1 {
      text-align: left;
      text-transform: uppercase;
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
      background: $apple;
      box-shadow: $tabshadow;
      left: 0;
    }
    &.right {
      color: white;
      background: $cherry;
      box-shadow: $tabshadow;
      right: 0;
    }
  }

  &.done {
    .card {
      background: #EEE;
      text-decoration: line-through;
      color: #CCC;
      h1, p {
        color: white;
      }

      .meta {
        opacity: 0;
      }
    }

    .left {
      background: #EEE;
      z-index: 2;
      box-shadow: none;
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
