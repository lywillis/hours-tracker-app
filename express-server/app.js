import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';

// import routes 
import timeLogRoutes from './routes/timelog.server.routes';
import projectRoutes from './routes/project.server.routes';
// define our app using express
const app = express();

// allow-cors
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  })

  // configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

// set the port
const port = process.env.PORT || 3001;
// connect to database
const mongodb = 'mongodb://express:express1@ds229621.mlab.com:29621/hourstracker';
mongoose.Promise = global.Promise;
mongoose.connect(mongodb, {
    useNewUrlParser: true
});

// add Source Map Support
SourceMapSupport.install();

app.use('/api', timeLogRoutes);
app.use('/api', projectRoutes);

app.get('/', (req,res) => {
    return res.end('Api working');
  })
// catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
  });
  // start the server
  app.listen(port,() => {
    console.log(`App Server Listening at ${port}`);
  });