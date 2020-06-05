const express = require('express');

const app = express();
const port = process.env.port || 4000;

require('./postgres');

app.get('/', (req, res) => res.send('Hello World!'));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
