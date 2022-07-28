const express = require('express');
const routes = require('./routes/properties.route');

const app = express();
const port = 3000;

app.use(routes);

app.listen(port, () => console.log(`The server is running on port ${port}`))