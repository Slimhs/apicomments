import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/commentRoutes';
const app = express();
const PORT = process.env.PORT;

var cors = require('cors')
app.use(cors())

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/commentsdb', {
    useMongoClient: true
});

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