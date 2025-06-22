<template>
  <div>
  <nav >
    <router-link  class="link" to="/">Vendas</router-link> 
    <router-link class="link" to="/resumoVendas" >Resumo de Vendas</router-link>
  </nav>

  
</div>
</template>

<script>

export default {
  nome: 'navbar'
}
</script>

<style scoped>
nav{
  font-family: 'Inter',sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50px;
 
  background-color:aqua;
 
  position: fixed;
  top:0
}

.link{
  text-decoration: none;
  color: white;
  font-size: 2rem;
  transition: 0.5s;
  font-weight: bold;
}

.link:hover{
  text-decoration: underline;
  color: rgb(255, 242, 0);
 
}
</style>
