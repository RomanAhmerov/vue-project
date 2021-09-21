<template>
  <div>
    <h1>Страница с постами</h1>

    <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
    />

    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>

      <my-select
          v-model="selectedSort"
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
    <!--    <div class="page__wrapper">
          <div
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              class="page"
              :class="{
                'current-page': page === pageNumber
              }"
              @click="changePage(pageNumber)"
          >
            {{ pageNumber }}
          </div>
        </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";

export default {
  components: {
    PostList, PostForm
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false, // Индикатор загрузки

      // Сортировка постов
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'}
      ],

      // Фильтрация постов
      searchQuery: '',

      // Пагинация
      page: 1,
      limit: 10,
      totalPages: 0
    }
  },

  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },

    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },

    showDialog() {
      this.dialogVisible = true
    },

    // // Пагинация
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },

    // Работа с сервером
    async fetchPosts() {
      try {
        this.isPostsLoading = true

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit) // Общее число страниц (Пагинация)
        this.posts = response.data

      } catch (e) {
        alert('Упс... ошибочка')

      } finally {
        this.isPostsLoading = false
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit) // Общее число страниц (Пагинация)
        this.posts = [...this.posts, ...response.data]

      } catch (e) {
        alert('Упс... ошибочка')
      }
    }
  },

  // Использование хуков
  mounted() {
    this.fetchPosts()
  },

  // Использование вычисляемых и наблюдаемых св-в
  watch: {
    // page () {
    //   this.fetchPosts()
    // }
  },

  computed: {
    // Фильтрация
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },

    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
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

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {

}
</style>

// Single file component
