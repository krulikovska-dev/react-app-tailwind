const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    setTimeout(() => next(), 350);
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`JSON Server running at http://localhost:${PORT}`);
    console.log(`Test it: http://localhost:${PORT}/shoppingLists`);
});