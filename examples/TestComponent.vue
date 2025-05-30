<template>
  <div class="test-component">
    <h1>{{ title }}</h1>
    <button @click="handleClick">{{ buttonText }}</button>
    <ChildComponent :message="message" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
  name: 'TestComponent',
  components: {
    ChildComponent
  },
  data() {
    return {
      title: 'Test Component',
      buttonText: 'Click Me',
      message: 'Hello from parent'
    }
  },
  methods: {
    handleClick() {
      console.log('Button clicked!')
      this.message = 'Button was clicked!'
    }
  }
}
</script>

<style scoped>
.test-component {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

h1 {
  color: #333;
}

button {
  background: #007acc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style> 