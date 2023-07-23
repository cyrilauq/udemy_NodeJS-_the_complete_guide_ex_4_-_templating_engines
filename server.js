const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./utils/path');

const router = require('./routes/index');

const app = express();

const port = 3000;


// Tell express which template engine to use
app.set('view engine', 'pug');
// Tell express where to find the views
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router.routes);

app.listen(port, () => {
    console.log(`Server listenning on port: ${port}`);
})