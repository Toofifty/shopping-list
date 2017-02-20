<template lang="pug">
  .add-item.ui.modal.segment
    .header New Item
    .content
      form.ui.form
        .field
          label Label
          input(type='text', name='label', placeholder='"Bread"')
        .field
          label Description
          textarea(name='desc', placeholder='"Buy me bread"')
    .actions
      .ui.cancel.button(@click='cancel') Cancel
      .ui.primary.button(@click='add_item') Add
</template>

<script>
export default {
  props: ['db'],
  methods: {
    add_item () {
      let item = {}
      item.label = $('.add-item input[name="label"]').val()

      if (item.label === '') return false

      item.desc  = $('.add-item textarea[name="desc"]').val()
      item.date  = new Date().toString()
      item.deleted = item.done = false
      item.by = window.localStorage.user_passcode
      let k = this.db.push().key
      let update = {}
      update[k] = item
      $('.add-item.modal').addClass('loading')
      this.db.update(update, () => {
        $('.add-item.modal').modal('hide').removeClass('loading')
        $('#items-list-container button').removeClass('hidden')
      })
      $('.add-item input[name="label"]').val('')
      $('.add-item textarea[name="desc"]').val('')
    },
    cancel () {
      $('#items-list-container button').removeClass('hidden')
      return true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
