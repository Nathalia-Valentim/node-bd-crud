import express from "express";
import bodyParser from "body-parser";
import sql from "msnodesqlv8";

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const connectionString = "server=DSN1191109156\SQLEXPRESS;Database=CARROS;Trusted_Connection=Yes;Driver={Sql Server Native Cliente 11.0}";

//leitura
app.get("/carros", (req, res) => {
    sql.query(connectionString, "SELECT * FROM carros", (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

//escrita 
app.post("/carros", (req, res) => {
    const { modelo, marca } = req.body;
    sql.query(connectionString, `INSERT INTO carros VALUES ('${ modelo }', '${ marca }')`,
        (erro, rows) => {
            if(erro) {
                res.status(500).json("Erro Interno de Servidor");
            } else {
                res.status(201).json("Cadastrado com sucesso!");
            }
        }
    );
});

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));

app.get("/carros/:id", (req, res) => {
    const{id} = req.params;
    sql.query(connectionString, `SELECT * FROM carros WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

app.put("/carros/:id", (req, res) => {
    const{id} = req.params;
    const{modelo, marca} = req.body;
    sql.query(connectionString, `UPDATE carros SET modelo = '${modelo}', marca = '${marca}' WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(201).json("Atualizado com sucesso!");
        }
    });
});