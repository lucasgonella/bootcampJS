const express = require('express');

const server = express();

server.use(express.json());

//localhost:3000/teste

// Query params = ?teste=1
// Route params = /users/1
// Request body = { }

const users = ['Diego', 'Pedro', 'Lucas']

server.use((req, res, next) => {
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`)

    next();
    console.timeEnd('Request');
})

// Route Params
//localhost:3000/users => Retorna todos os Users
server.get('/users', (req, res) => {
    return res.json(users);
})

// Query Params
//localhost:3000/users/3
server.get('/users/:index', (req, res) => {

    const { index } = req.params;


    return res.json(users[index]);
})

server.post('/users', (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
})

server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
})

server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);
    return res.send();
})

server.listen(3000);