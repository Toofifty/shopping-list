<template lang='pug'>
  .edit-comment(:class='by ? "left-" + by.color : ""')
    input(v-model='value', :value='value', @change='update')
</template>

<script>
export default {
  props: ['value', 'by'],
  mounted () {
    console.log(this.value)
  },
  methods: {
    update () {
      this.$emit('update', this.value)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/_variables.scss';

.edit-comment {
  background: $card-lgray;

  input {
    width: 100%;
    height: 100%;
    font-size: 0.7em;
    color: $card-gray;
    padding: 0.5em;
    border: none;
    border-bottom: 1px solid transparent;
    transition: 0.25s;

    &:focus {
      outline: none;
      color: $ocean;
      border-bottom-color: $ocean;
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
