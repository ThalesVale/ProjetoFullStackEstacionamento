const express = require("express");
const cors = require("cors");
// O cons vai fazer o projeto aceitar requisições externas xomo chamar outro arquivo
const porta = 3000
const app = express();
app.use(express.json());
app.use(cors());
let VEICULOS = [{
    id: 1, placa: "ABC-1234", modelo: "Seden",
    hora_entrada: new Date().toISOString(),
    pago: true
},
{
    id: 2, placa: "DEF-5678", modelo: "SUV",
    hora_entrada: new Date().toISOString(),
    pago: false
}];


app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello" })
});

app.get("/lerveiculos", (req, res) => {
    res.status(200).json(VEICULOS)
})

app.get("/lerveiculos/:id", (req, res) => {
    const id = Number(req.params.id);
    const carro = VEICULOS.find(veiculo => veiculo.id === Number(id))
    res.status(200).json(carro)
})

app.patch("/atualizarpagamento/:id", (req, res) => {
    const veiculo = VEICULOS.find(x => x.id === Number(req.params.id));
    console.log(veiculo)
    if (!veiculo) return res.status(404).json({ erro: "Não achei" })

    const { pago } = req.body;

    if (pago !== undefined) veiculo.pago = pago;

    res.json(veiculo)
})

app.listen(porta, () => {
    console.log(`servidor rodando no http://localhost:${porta}`);
})