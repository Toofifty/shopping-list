<template lang="pug">
  .add-note.ui.modal.segment
    .header {{ type }} note
    .content
      form.ui.form
        .field
          label Title
          input(type='text', name='label', placeholder='"Rent"', :default='title')
        .field
          label Note
          textarea(name='desc', placeholder='"Account info is ..."', :default='content')
    .actions
      .ui.cancel.button Cancel
      .ui.primary.button(@click='add_note') Add
</template>

<script>
export default {
  props: ['db', 'title', 'content', 'type'],
  methods: {
    add_note () {
      let note = {}
      note.label = $('.add-note input[name="label"]').val()

      if (note.label === '') return false

      note.desc  = $('.add-note textarea[name="desc"]').val()
      note.date  = new Date().toString()
      note.deleted = note.done = false
      note.by = {
        name: 'Matho',
        color: 3
      }
      let k = this.db.push().key
      let update = {}
      update[k] = note
      $('.add-note.modal').addClass('loading')
      this.db.update(update, () => {
        $('.add-note.modal').modal('hide').removeClass('loading')
      })
      $('.add-note input[name="label"]').val('')
      $('.add-note textarea[name="desc"]').val('')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
