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
      .ui.cancel.button Cancel
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
      item.by = {
        name: 'Matho',
        color: 3
      }
      let k = this.db.push().key
      let update = {}
      update[k] = item
      $('.add-item.modal').addClass('loading')
      this.db.update(update, () => {
        $('.add-item.modal').modal('hide').removeClass('loading')
      })
      $('.add-item input[name="label"]').val('')
      $('.add-item textarea[name="desc"]').val('')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
