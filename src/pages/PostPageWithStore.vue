<template>
  <div>
    <h1>Страница с постами (Store)</h1>

    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
    />

    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>

      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>

    <post-list
        v-if="!isPostsLoading"
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
    />
    <div v-else>Идёт загрузка ...</div>

    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex' // Специальные функции для укорочения записи

export default {
  components: {
    PostList, PostForm
  },

  data() {
    return {
      dialogVisible: false
    }
  },

  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setNewPost: 'post/setNewPost',
      deletePost: 'post/deletePost',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),

    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts'
    }),

    createPost(post) {
      this.setNewPost(post)
      this.dialogVisible = false
    },

    removePost(post) {
      this.deletePost(post)
    },

    showDialog() {
      this.dialogVisible = true
    },
  },

  mounted() {
    this.fetchPosts()
  },

  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,

      // Сортировка постов
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,

      // Фильтрация постов
      searchQuery: state => state.post.searchQuery,

      // Пагинация
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages
    }),

    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  }
}
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.observer {

}
</style>

// Single file component
