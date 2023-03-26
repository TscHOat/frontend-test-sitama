import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

// vuetify
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import CKEditor from '@ckeditor/ckeditor5-vue'

const vuetify = createVuetify({
  components: { ...components, VDataTable },
  directives
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(CKEditor)

app.mount('#app')
