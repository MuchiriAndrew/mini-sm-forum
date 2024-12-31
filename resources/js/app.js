import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import ClickOutsideDirective from './ClickOutsideDirective';
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    return pages[`./Pages/${name}.vue`]
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(Toast, {
        position: POSITION.TOP_RIGHT,
        timeout: 5000,
      })
      .directive('click-outside', ClickOutsideDirective)
      .mount(el)
  },
})
