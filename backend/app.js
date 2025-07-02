import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();


const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});
  

app.listen(3000, () => {
    console.log(`estou na porta ${3000}`)
})
//conectando com o banco de dados
let conexao
   async function conectarBanco() {
       try {
           conexao = await mysql.createConnection({
               host: 'nozomi.proxy.rlwy.net',
               port: 16752,
               user: 'root',
               password: 'xvaYEmvOrrOQAUSyReciboubzGXJcRse',
               database: 'railway'
        });
           console.log("conexao com o banco de dados feita")
       }
       catch (error) {
           console.error('erro ao conectar com banco')
       }
}
   conectarBanco()




//criando rota para inserir dados no bd
app.post("/finalizar", async (req, res) => {
    const{ desc, valorVenda, opcoes}=req.body
    let sql = `INSERT INTO vendas (descricao, valorVenda, formaPagamento) VALUES (?, ?, ?)`;
  
    try {
        const [result] = await conexao.execute(sql, [desc, valorVenda, opcoes]);

        console.log(result)
        res.send('venda cadastrada com sucesso');
    }
    catch (error) {
        console.error(error)
       res.status(500).send('erro ao cadastrar venda')
    }
   
});
//rota para buscar os dados no banco
  
app.get('/vendas', async (req, res) => {

    try {
        const [rows] = await conexao.execute('select * from vendas order by id desc')
        res.json(rows)
    }
    catch (error) {
        console.error(error)
        res.status(500).send('erro ao consultar vendas')
    }
})
// rota para deletar o registro
app.delete('/deletarVenda/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const sql = 'DELETE FROM vendas WHERE id = ?';
        const [result] = await conexao.execute(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Venda não encontrada');
        }

        res.send('Venda deletada com sucesso!');
        console.log(id)
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar venda');
    }
});


//rota para buscar o total 
app.get("/totalVendas", async (req, res) => {
    try {
        let sql = "select sum(valorVenda) as total from vendas"
        let [rows] = await conexao.execute(sql,)
        res.json({ totalVendas: rows[0].total });
    } catch (error) {
        console.log(error)
        res.status(500).send('Erro ao buscar o total de vendas')
}
    
})
  


