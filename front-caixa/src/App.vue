<template>
  <div>
<navbar></navbar>  
<router-view/>
</div>
</template>

<script>
import navbar from './components/navbar.vue'


export default {
  components: {
  navbar
}
  
}

</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
</style>