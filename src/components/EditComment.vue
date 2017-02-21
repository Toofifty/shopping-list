<template lang='pug'>
  .edit-comment(:class='by ? "left-" + by.color : ""', v-if='value !== ""')
    input(:value='value', @input='update($event.target.value)', :disabled='!can_edit')
</template>

<script>
export default {
  props: ['value', 'by'],
  mounted () {
    console.log(this.value)
  },
  computed: {
    can_edit () {
      return true
    }
  },
  methods: {
    update (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/_variables.scss';

.edit-comment {
  input {
    width: calc(100% - 1em);
    height: 100%;
    font-size: 0.7em;
    color: $card-gray;
    padding: 0.5em;
    margin: 0 0.5em;
    border: none;
    border-bottom: 1px solid transparent;
    transition: 0.25s;
    background: transparent;

    &:focus {
      outline: none;
      color: $ocean;
      border-bottom-color: $ocean;
      box-shadow: 0 1px 5px $card-lgray;
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
