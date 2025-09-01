import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Criando pool de conexões
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

// Rota para inserir dados no banco
app.post('/finalizar', async (req, res) => {
    const { desc, valorVenda, opcoes } = req.body;
    const sql = 'INSERT INTO vendas (descricao, valorVenda, formaPagamento) VALUES (?, ?, ?)';
    try {
        const [result] = await pool.execute(sql, [desc, valorVenda, opcoes]);
        console.log(result);
        res.send('Venda cadastrada com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar venda');
    }
});

// Rota para listar vendas
app.get('/vendas', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM vendas ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao consultar vendas');
    }
});

// Rota para deletar venda
app.delete('/deletarVenda/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM vendas WHERE id = ?';
        const [result] = await pool.execute(sql, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Venda não encontrada');
        }
        res.send('Venda deletada com sucesso!');
        console.log(`Venda deletada: ${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar venda');
    }
});

// Rota para total de vendas
app.get('/totalVendas', async (req, res) => {
    try {
        const sql = 'SELECT SUM(valorVenda) AS total FROM vendas';
        const [rows] = await pool.execute(sql);
        res.json({ totalVendas: rows[0].total });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar o total de vendas');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



