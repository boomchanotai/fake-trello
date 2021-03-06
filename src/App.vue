<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
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