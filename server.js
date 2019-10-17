const port = parseInt(process.env['APP_PORT'] || '8082');
const express = require('express');
const app = express();

app.use('/pointsy', express.static('static'));

app.listen(port, 'localhost', () => {
    console.log('Service started at http://localhost:' + port + '/pointsy' + '/');
});
