const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Permite que o navegador acesse a imagem fundo.png diretamente
app.use(express.static(path.join(__dirname)));

app.get('/digitar', (req, res) => {
    res.sendFile(path.join(__dirname, 'digitar.html'));
});

app.get('/ver', (req, res) => {
    res.sendFile(path.join(__dirname, 'ver.html'));
});

app.get('/', (req, res) => {
    res.redirect('/digitar');
});

io.on('connection', (socket) => {
    socket.on('dados-digitados', (dados) => {
        socket.broadcast.emit('mostrar-dados', dados);
    });
});

// Substitua o http.listen antigo por este:
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});