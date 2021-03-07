<template>
  <div id="app">
    <HorizontalScroll class="h-screen">
      <router-view></router-view>
    </HorizontalScroll>
  </div>
</template>

<script>
import HorizontalScroll from 'vue-horizontal-scroll'
import 'vue-horizontal-scroll/dist/vue-horizontal-scroll.css'

export default {
  name: 'App',
  components: {
    HorizontalScroll
  },
  watch: {
      $route: {
          immediate: true,
          handler(to) {
              document.title = to.meta.title || 'Fake Trello';
          }
      },
  }
}
</script>