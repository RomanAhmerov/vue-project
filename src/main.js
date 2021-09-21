import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI' // Импорт переиспользуемых компонент (UI библиотека)
import router from '@/router/router'
import directives from '@/directives'
import store from '@/store'

// Создание
const app = createApp(App)

// Регистрация с объектом настроек
components.forEach(component => {
    app.component(component.name, component)
})

// Регистрация своих директив
directives.forEach(directive => {
    app.directive(directive.name, directive)
})

// Применение роутера, store и монтирование
app
    .use(router)
    .use(store)
    .mount('#app')
