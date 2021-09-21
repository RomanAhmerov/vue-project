import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),

    // Computed свойства (вычисляемые)
    getters: {
        // Сортировка списка
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },

        // Фильтрация на основе отсортированного списка
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },

        setLoading(state, bool) {
            state.isPostsLoading = bool
        },

        setPage(state, page) {
            state.page = page
        },

        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },

        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },

        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },

        setNewPost(state, post) {
            state.posts.push(post)
        },

        deletePost(state, post) {
            state.posts = state.posts.filter(p => p.id !== post.id)
        }
    },

    actions: {
        // Работа с сервером
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true)

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit)) // Общее число страниц (Пагинация)
                commit('setPosts', response.data)

            } catch (e) {
                alert('Упс... ошибочка')

            } finally {
                commit('setLoading', false)
            }
        },

        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])

            } catch (e) {
                alert('Упс... ошибочка')
            }
        }
    },

    namespaced: true
}
