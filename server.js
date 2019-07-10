const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const server = app.listen(port, listening);

function listening() {
    console.log('listening...');
}

app.use(express.static('website'));

app.get('/', (req, res)=> res.send('index.html'));