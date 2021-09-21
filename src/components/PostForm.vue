<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
        v-focus
        v-model="post.title"
        placeholder="Название" />

    <my-input
        v-model="post.body"
        placeholder="Описание" />

    <my-button @click="createPost" class="form__btn">Создать</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },

  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post) // Создание события для того, чтобы родитель подписался на него и получил данные из ребенка
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.form__btn {
  margin-top: 15px;
  align-self: flex-end;
}
</style>

