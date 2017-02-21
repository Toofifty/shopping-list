<template lang='pug'>
  #settings-list-container.ui.tab.top.attached
    ul
      li.simple
        input(type='text', name='passcode', :value='passcode', @change='load_id')
        .magic.label passcode
      li.simple
        input(type='text', name='name', v-model='name', placeholder='John', @change='update_user')
        .magic.label name
      li.simple
        input(type='text', name='name', v-model='email', placeholder='john@example.com', @change='update_user')
        .magic.label email
      li.simple
        input(type='text', name='name', v-model='phone', placeholder='03 1234 5678', @change='update_user')
        .magic.label phone
      li.color-container
        ul.color-list
          li.color-choice.color-1(@mousedown='set_color(1)')
            i.ui.checkmark.icon
          li.color-choice.color-2(@mousedown='set_color(2)')
            i.ui.checkmark.icon
          li.color-choice.color-3(@mousedown='set_color(3)')
            i.ui.checkmark.icon
          li.color-choice.color-4(@mousedown='set_color(4)')
            i.ui.checkmark.icon
          li.color-choice.color-5(@mousedown='set_color(5)')
            i.ui.checkmark.icon
        .magic.label color
      li.simple.submit(@click='update_user')
        h1 submit
      li.simple.users
        ul.user-list
          li.user(v-for='user in users', :class='"color-" + user.color')
            h6 {{ user.name }}
            p {{ user.email }}
            p {{ user.phone }}
</template>

<script>
export default {
  props: ['db', 'uservalid'],
  data () {
    return {
      passcode: '',
      name: '',
      email: '',
      phone: '',
      color: 0,
      users: {}
    }
  },
  mounted () {
    this.passcode = window.localStorage.user_passcode || ((d) => {
      let c = d.getTime().toString('36')
      window.localStorage.user_passcode = c
      return c
    })(new Date())
    this.load_user()
  },
  methods: {
    load_user () {
      if (!window.localStorage.users
          || !JSON.parse(window.localStorage.users)[this.passcode]) {
        $('input[name="passcode"]').addClass('invalid')
        this.name = ''
        this.email = ''
        this.phone = ''
        this.color = 0
        this.$emit('validchange', false)
        $('.users').addClass('hidden')
        return
      }
      $('input[name="passcode"]').removeClass('invalid')
      let user = JSON.parse(window.localStorage.users)[this.passcode]
      this.name  = user.name
      this.email = user.email
      this.color = user.color
      this.phone = user.phone
      window.localStorage.user_passcode = this.passcode
      this.$emit('validchange', true)
      $('.color-' + this.color).addClass('selected')
      $('.users').removeClass('hidden')
      this.users = JSON.parse(window.localStorage.users)
    },
    update_user () {
      if (window.localStorage.users
          && JSON.parse(window.localStorage.users)[this.passcode] !== undefined) {
        let data = {
          name: this.name,
          email: this.email,
          color: this.color,
          phone: this.phone
        }
        this.db.ref('users/' + this.passcode).update(data)
      }
    },
    load_id (e) {
      this.passcode = e.target.value
      this.load_user()
    },
    set_color (id) {
      this.color = id
      $('.color-choice').removeClass('selected')
      $('.color-' + this.color).addClass('selected')
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

#settings-list-container {
  max-height: calc(100vh - 56px);
  overflow-y: scroll;
  overflow-x: hidden;

  ul { margin: 0; }
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

    &.invalid {
      color: $cherry !important;
      border-bottom-color: $cherry !important;
    }

    &:focus {
      outline: none;
      border-bottom-color: $ocean;
    }
  }

  &.submit {
    background-color: $ocean;
    color: $card-bg;
    padding: 1.6em;
    transition: 0.25s;
    cursor: pointer;

    &:active { background-color: $aoi; }
  }

  .magic.label {
    text-align: right;
    display: inline-block;
    color: $card-gray;
    font-size: 0.8em;
  }

  &.users {
    padding: 0;
    .user-list {
      display: flex;
      margin: 0;
      height: 100%;

      li.user {
        flex-grow: 1;
        color: $card-bg;
        margin: 0;
        padding: 1em;

        h6, p {
          margin: 0;
        }

        h6 {
          font-size: 1em;
        }

        p {
          font-size: 0.6em;
        }
      }
    }
  }
}

ul.color-list { display: flex; }

li.color-choice {
  flex-grow: 1;
  margin: 0;
  height: 40px;
  transition: 0.5s;
  cursor: pointer;

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
.color-1 { background: #69D2E7; }
.color-2 { background: #A7DBD8; }
.color-3 { background: #E0E4CC; }
.color-4 { background: #F38630; }
.color-5 { background: #FA6900; }
</style>
