<template lang="pug">
  .container.noselect
    .option.left(:id="'lo-card-' + item.id")
      i.checkmark.icon
    .option.right(:id="'ro-card-' + item.id")
      i.trash.outline.icon
    .card(:id="'item-card-' + item.id")
      p {{ item.label }}
</template>

<script>
// import semantic

export default {
  props: ['item'],
  mounted () {
    let $card = $('#item-card-' + this.item.id)
    let $lo = $('#lo-card-' + this.item.id)
    let $ro = $('#ro-card-' + this.item.id)
    let xval = 0
    $card.on('mousedown', (e) => {
      xval = e.pageX
      console.log(xval)
      $card.css('transition', '0s')
      $lo.css('transition', '0s')
      $ro.css('transition', '0s')
      $card.on('mousemove', (e) => {
        let dist = e.pageX - xval
        if (dist > 200) {
          dist = 200
          this.markDone()
        } else if (dist < -200) {
          dist = -200
          this.markTrashed()
        }
        $card.css('margin-left', dist + 'px')
        if (dist > 0) {
          $lo.css('width', (100 + dist / 2) + 'px')
        } else {
          $ro.css('width', (100 + -dist / 2) + 'px')
        }
      })

      $card.on('mouseup', (e) => {
        $card.off('mousemove')
        $card.css('transition', '0.5s')
        $card.css('margin-left', '0px')
        $lo.css('transition', '0.5s')
        $lo.css('width', '100px')
        $ro.css('transition', '0.5s')
        $ro.css('width', '100px')
        xval = 0
      })
    })
  },
  data () {
    return {
      a: []
    }
  },
  methods: {
    markDone () {
    },
    markTrashed () {
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
  text-transform: uppercase;
  color: $goldfish;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.4em;
  font-weight: bolder;
  transition: 0s;
  height: 5em;
  position: relative;
  margin-bottom: 10px;
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #d4d4d5;
}
.card {
  width: 100%;
  background: white;
  // border: 1px solid #d4d4d5;
  position: absolute;
  height: 100%;
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
