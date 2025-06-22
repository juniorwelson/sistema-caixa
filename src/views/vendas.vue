<template>
  <div class="home">
    <p class="data" id="data"></p>
    <registro/>
  </div>
</template>

<script>
import registro from '../components/registro.vue'

export default {
  components: {
    registro
  },
  methods: {
    dataTime() {
      const data = new Date()
      const dataFormatada = data.toLocaleString('pt-BR')
      let dta=document.getElementById('data').innerHTML= dataFormatada
    }
  },
  mounted() {
    this.dataTime()
  }
}


</script>
<style scoped>

.data{
  position: fixed;
  left: 85%;
  font-size:1em;
  color:red;
  font-weight:bold
}

</style>


