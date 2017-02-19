<template lang='pug'>
  #settings-list-container.ui.tab.top.attached.loading
    ul
      li.simple
        input(type='text', name='passcode', :value='passcode', @change='load_id')
        .magic.label passcode
      li.simple
        input(type='text', name='name', v-model='name', placeholder='Sam', @change='update_user')
        .magic.label name
      li.simple
        input(type='text', name='name', v-model='email', placeholder='sawrig@gmail.com', @change='update_user')
        .magic.label email
      li.color-container
        ul.color-list
          li.color-choice-1(@mousedown='set_color(1)')
            i.ui.checkmark.icon
          li.color-choice-2(@mousedown='set_color(2)')
            i.ui.checkmark.icon
          li.color-choice-3(@mousedown='set_color(3)')
            i.ui.checkmark.icon
          li.color-choice-4(@mousedown='set_color(4)')
            i.ui.checkmark.icon
          li.color-choice-5(@mousedown='set_color(5)')
            i.ui.checkmark.icon
        .magic.label color


</template>

<script>
export default {
  props: ['db'],
  data () {
    return {
      passcode: '',
      name: 'dog',
      email: 'meme',
      color: 1
    }
  },
  mounted () {
    this.passcode = window.localStorage.user_passcode || ((d) => {
      let c = d.getTime().toString('36')
      window.localStorage.user_passcode = c
      return c
    })(new Date())
    $('.color-choice-' + this.color).addClass('selected')

    let user = window.shopping_list_users[this.passcode]
    this.name  = user.name
    this.email = user.email
    this.color = user.color
  },
  methods: {
    update_user () {
      if (window.shopping_list_users[this.passcode] !== undefined) {
        let data = {
          name: this.name,
          email: this.email,
          color: this.color
        }
        this.db.ref('users/' + this.passcode).update(data)
      } else {
        console.log('invalid.')
      }
    },
    load_id (e) {
      let new_id = e.target.value
    },
    set_color (id) {
      this.color = id
      console.log('set color to ' + this.color)
      $('[class*="color-choice-"]').removeClass('selected')
      $('.color-choice-' + this.color).addClass('selected')
      this.update_user()
    }
  }

  // user database scheme
  // {
  //   'izcbt8gr': {
  //     name: 'Matho',
  //     color: 3,
  //     email: 'alex@matho.me'
  //   }
  // }
}
</script>

<style lang='scss' scoped>
@import '../assets/_variables.scss';

#settings-list-container ul {
  margin: 0;
}

li.simple,
li.color-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  animation: $fade-in-anim;
  color: $ocean;

  font-size: 1.4em;
  height: 5em;
  margin: 0;
  width: 100%;
  background: $card-bg;
  padding: 1em;

  input {
    border: none;
    border-bottom: 1px solid $card-lgray;
    width: 100%;
    transition: 0.5s;
    padding: 0.3em;

    &:focus {
      outline: none;
      border-bottom-color: $ocean;
    }
  }

  .magic.label {
    text-align: right;
    display: inline-block;
    color: $card-gray;
    font-size: 0.8em;
  }
}

ul.color-list {
  display: flex;
}

li[class*='color-choice-'] {
  flex-grow: 1;
  margin: 0;
  height: 40px;
  transition: 0.5s;

  i.ui.checkmark.icon {
    color: transparent;
    transition: 0.25s;
    padding: 0.5em 0;
  }

  &:active {
    transform: translateY(-4px);
    box-shadow: $hard-shadow;
  }

  &.selected {
    i.ui.checkmark.icon { color: white; }
  }
}
.color-choice-1 { background: #69D2E7; }
.color-choice-2 { background: #A7DBD8; }
.color-choice-3 { background: #E0E4CC; }
.color-choice-4 { background: #F38630; }
.color-choice-5 { background: #FA6900; }
</style>
