const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Simulate real network delay (optional but nice for development)
server.use((req, res, next) => {
    setTimeout(() => next(), 350);
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`JSON Server running at http://localhost:${PORT}`);
    console.log(`Test it: http://localhost:${PORT}/shoppingLists`);
});