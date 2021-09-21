<template>
  <div>
    <h1>Страница с постами</h1>

    <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
    />

    <div class="app__btns">
      <my-button
      >
        Создать пост
      </my-button>

      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form />
    </my-dialog>

    <post-list
        v-if="!isPostsLoading"
        :posts="sortedAndSearchedPosts"
    />
    <div v-else>Идёт загрузка ...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import {usePosts} from "@/hooks/usePosts"
import {useSortedPosts} from "@/hooks/useSortedPosts"
import {useSortedAndSearchedPosts} from "@/hooks/useSortedAndSearchedPosts"

export default {
  components: {
    PostList, PostForm
  },

  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'}
      ]
    }
  },

  setup(props) {
    const {posts, isPostsLoading, totalPages} = usePosts(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {sortedAndSearchedPosts, searchQuery} = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      sortedAndSearchedPosts,
      searchQuery
    }
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
