<template>
  <One></One>
  <Two></Two>
  <Three></Three>
</template>

<script>
  // import Header from '@/components/header.vue'
  import One from './components/one.vue'
  import Two from './components/two.vue'
  import Three from './components/three.vue'

  export default {
    name: 'App',
    components:{
      One,
      Two,
      Three,
    },
  }
</script>

