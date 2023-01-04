<template>
<NavBar />

<Escala />
</template>

<script>
import NavBar from './components/NavBar.vue'
import Escala from './components/ExEscala.vue'

export default {
  name: 'App',
  components: {
    Escala,
    NavBar
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
