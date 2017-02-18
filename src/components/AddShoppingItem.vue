<template lang="pug">
  .add-item.ui.modal
    .header New Item
    .content
      form.ui.form
        .field
          label Label
          input(type='text', name='label', placeholder='"Bread"')
        .field
          label Description
          textarea(name='desc', placeholder='"By me bread"')
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
      item.label = $('input[name="label"]').val()

      if (item.label === '') return false

      item.desc  = $('textarea[name="desc"]').val()
      item.date  = new Date().toString()
      item.deleted = item.done = false
      item.by = {
        name: 'Matho',
        color: 3
      }
      let k = this.db.ref('items/').push().key
      let update = {}
      update[k] = item
      this.db.ref('items/').update(update, () => {
        $('.add-item.modal').modal('hide')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
