<template>
  <div id="app">
    <TestComponent />
    <TestComponent />
    <div>
      <!-- 这里导入了TestComponent -->
      <TestComponent v-for="item in items" :key="item.id" />
    </div>
  </div>
</template>

<script>
import TestComponent from './TestComponent.vue'

export default {
  name: 'App',
  components: {
    TestComponent  // 注册TestComponent
  },
  data() {
    return {
      items: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> 