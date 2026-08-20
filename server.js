const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Servir arquivos estáticos (imagens, CSS, etc.)
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
    // Encaminha os dados da chamada para o painel de visualização
    socket.on('dados-digitados', (dados) => {
        socket.broadcast.emit('mostrar-dados', dados);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
