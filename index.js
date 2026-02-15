const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const ejs = require('ejs');
const path = require('path')
const CreateLinkRouter = require('./Routes/Shortner.route')
const RedirectRouter = require('./Routes/redirect.route')
const { HandleConnectMongo } = require('./config/connectMongo')
const StaticRouter = require('./Routes/static.route')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
   const internalKey = req.headers['x-internal-key'];
   if(!internalKey || internalKey !== process.env.INTERNAL_API_KEY) {
        return res.status(403).json({ error: 'Direct access denied' });
   }
   next();
});

HandleConnectMongo(process.env.MONGOOSE_URL);
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views') );


app.use('/api',CreateLinkRouter)
app.use('/',StaticRouter)
app.use('/',RedirectRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})