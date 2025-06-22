<template>
  <div>
    <img src="../assets/img/img inicial.png" alt="operando o caixa">
    <main class="container">
    <form action="/finalizar" method="post">
    <section id="descricao"> 
      <h2>Descrição da Venda</h2>
      <input type="text" required maxlength="100" minlength="30" v-model="descricaoVenda" name="desc"  autocomplete="off" />
    </section>

    <section id="valorVenda">
      <h2>VALOR DA VENDA</h2>
      <input type="text" v-model="valorVendaFormatado" placeholder="R$ 0,00" name="valorVenda"  autocomplete="off"/>
    </section>

    <section id="formaPagamento">
    <label for="opcoes">FORMA DE PAGAMENTO</label>
    <select name="opcoes" id="opcoes" ref="opcoes" >
      <option value="DINHEIRO" selected>DINHEIRO</option>
      <option value="CARTÃO DE CRÉDITO">CARTÃO DE CRÉDITO</option>
      <option value="CARTÃO DE DÉDITO">CARTÃO DE DÉDITO</option>
      <option value="PIX">PIX</option>
    </select>
    </section>

    <section id="valorPago">
      <h2>VALOR PAGO</h2>
      <input type="text" v-model="valorPagoFormatado" placeholder="R$ 0,00"  name="valorPago"  autocomplete="off"/>
    </section>

    <section id="troco">
      <h2>TROCO</h2>
      <input type="text" :value="trocoFormatado" disabled />
    </section>

    <section id="finalizar">
      <button  type="button" class="btn btn-success" id="btn" @click="finalizarVenda">FINALIZAR VENDA</button>
     
    </section>
    </form>
  </main>
  </div>
 
</template>

<script>
export default {
  name: "registro",
  data() {
    return {
      descricaoVenda: "",
      valorVenda: 0, // Em centavos
      valorPago: 0,  // Em centavos
    };
  },
  computed: {
    valorVendaFormatado: {
      get() {
        return this.formatarNumero(this.valorVenda);
      },
      set(valor) {
        this.valorVenda = this.desformatarMoeda(valor);
      },
    },
    valorPagoFormatado: {
      get() {
        return this.formatarNumero(this.valorPago);
      },
      set(valor) {
        this.valorPago = this.desformatarMoeda(valor);
      },
    },
    troco() {
      const resultado = this.valorPago - this.valorVenda;
      return resultado > 0 ? resultado : 0;
    },
    trocoFormatado() {
      return this.formatarNumero(this.troco);
    },
  },
  methods: {
    formatarNumero(valor) {
      return (valor / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    desformatarMoeda(valor) {
      return Number(valor.replace(/[^0-9]/g, ''));
    },
    async finalizarVenda() {
      // Validação simples dos campos
      if (
        this.descricaoVenda.trim() === "" ||
        !this.valorVenda ||
        this.valorVenda <= 0 ||
        !this.valorPago ||
        this.valorPago <= 0 ||
        this.valorPago < this.valorVenda
      ) {
        alert("FORNEÇA TODOS OS DADOS DA COMPRA CORRETAMENTE");
        return; // para aqui se não passar na validação
      }

      // Montando o objeto para enviar
      const dados = {
        desc: this.descricaoVenda,
        valorVenda: this.valorVenda/100,
        opcoes: this.$refs.opcoes.value
      };

      try {
        const res = await fetch('http://localhost:3000/finalizar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dados)
        });

        if (!res.ok) {
          throw new Error('Erro na resposta do servidor');
        }

        const texto = await res.text();
        alert(texto);

        // Limpando os campos só após o envio com sucesso
        this.descricaoVenda = "";
        this.valorVenda = "";
        this.valorPago = "";

      } catch (error) {
        alert('Erro ao enviar venda');
        console.error(error);
      }
    }
  }
};

  


    
</script>



<style scoped>

main {
 background-color:aqua;
  margin-top: 5%;
  width: 500px;
  height: 700px;
  border-radius: 10%;
  margin-left: 50%;

}

img{
  position: fixed;
  top: 10%;
  left: 5%;
  bottom: 10%;
  width:600px;
  height: 800px;
}

section {
  margin-left: 15%;
  margin-top: 4%;
}
label,h2{
  
  font-size: 2em;
  font-weight: bold;

}
input{
  color: red;
  height: 50px;
  font-size: 2em;
  border: none;
  outline-color: red;
}
select{
  font-size: 1.5em;
  color: red;
  font-weight: bold;
  width: 300px;
}


#desc {
  width: 100%;
  padding-left: 10px;
  border-radius: 5px;
}
#finalizar{
  width: 100%;
  margin-top: 10%;
  margin-left: 20%;
}

#btn{
  width: 300px;
  height: 80px;
  font-size: 2em;
  text-align: center;
}





</style>
