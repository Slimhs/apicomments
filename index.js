import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/commentRoutes';
const app = express();
const PORT = process.env.PORT || 8080;

var cors = require('cors')
app.use(cors())

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://slim:Kh%40dija2010@comments-r3ifj.mongodb.net/test', { useNewUrlParser: true });


// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);