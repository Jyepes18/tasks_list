const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


const taskRoutes = require('./routers/taskRoutes');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));


app.use('/', taskRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
