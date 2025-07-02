<template>

    <section class="container">

      <section  id="formu">
        <label for="senha">DIGITE A SENHA DE ADM</label>
        <input type="password" id="senha" name="senha" v-model="senha" maxlength="4">
        <button  type="button" class="btn btn-success" id="btn" @click="verificarSenha" >VERIFICAR</button>
      </section>






      <div id="total" v-if="AcessoLiberado">
        <h2>TOTAL DE VENDAS</h2>
        
        <p >{{ formatarNumero(totalV) }} </p>
      </div> 
    
    
      <hr>
      <div id="tabela" v-if="AcessoLiberado">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DESCRIÇÃO</th>
              <th>VALOR</th>
              <th>F/PAGAMENTO</th>
              <th>DATA</th>
              <th>AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="venda in vendas" :key="venda.id">
              <td>{{ venda.id }}</td>
              <td>{{ venda.descricao }}</td>
              <td>{{ formatarNumero(venda.valorVenda) }}</td>
              <td>{{ venda.formaPagamento }}</td>
              <td>{{ formatarDataHora(venda.datavenda) }}</td>

              <td>
                <button class="btn btn-danger btn-block" @click="deletarVenda(venda.id)">EXCLUIR</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </section>

  
  </template>
  
  <script>
  export default {
    name: 'Resumo',
    data() {
      return {
        AcessoLiberado: false,
        senha:'',
        vendas: [],
        totalV: 0
      };
    },
    methods: {

      verificarSenha() {
        const minhaSenha = 1234
        if (this.senha == minhaSenha) {
          this.AcessoLiberado = true;
          let formu = document.getElementById('formu')
          formu.style.display='none'
      
        } else {
          alert('VOCÊ NÃO TEM PERMISSÃO ')
          this.senha = ''
         
        }
      },
      async carregarVendas() {
        try {
          
          const res = await fetch('https://sistema-caixa-hyyk.onrender.com/vendas');
          const data = await res.json();
          this.vendas = data;
        } catch (error) {
          alert('Erro ao carregar vendas: ' );
        }
      },
      formatarNumero(valor) {
        return Number(valor).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
        },
        formatarDataHora(dataString) {
  const data = new Date(dataString);
  return data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
      },
      async deletarVenda(id) {
        try {
          
    await fetch(`http://sistema-caixa-hyyk.onrender.com/deletarVenda/${id}`, {
      method: 'DELETE',
    });
    alert('Venda deletada com sucesso!');
    this.carregarVendas(); // Atualiza a lista
    this.total()
  } catch (error) {
    alert('Erro ao deletar venda: ' );
        }
  
      },

      async total() {
        try {
    const resposta = await fetch('https://sistema-caixa-hyyk.onrender.com/totalvendas', {
        method: 'GET'
    });

    const dados = await resposta.json();
          this.totalV = dados.totalVendas; // <-- Aqui você recebe o valor do backend e atualiza a variável
   
} catch (error) {
    console.log(error);
    alert('Erro ao buscar o total de vendas');
}

      }


    },
    mounted() {
      this.carregarVendas();
      this.total();
      
    }
  };
  </script>

<style scoped>
.container{
    margin-top: 15%;
    font-family: 'Inter',sans-serif;
}
img{
    position: fixed;
    top: 20%;
    width: 500px;
    height: 600px;
}

table{
    width:800px;
    border:2px solid black;
    background-color: aqua;
    
}

tr,td,th{
    border: 2px solid black;
    padding-left: 10px;
    text-align: center;
}

td{
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 1.5em;
}
th{

    font-size: 2em;
}

#btn{
  margin-bottom: 5px;
  padding: 10px;
  font-weight: bold;
}
p{
  color: red;
  font-size: 2em;
  font-weight: bold;
}

#total{
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
  background-color: aqua;
  width: 700px;
}
#formu{
  margin-bottom:10% ;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aqua;
  width: 500px;
  border-radius: 5%;
  padding: 10px;
  margin-left: 35%;
}
label{
  color: white;
  font-weight: bold;
text-decoration: underline;
padding-bottom: 10px;
font-size: 2em;
}
input{
  color: red;
  border: none;
}

#btn{
  margin-top:10px ;
}

</style>