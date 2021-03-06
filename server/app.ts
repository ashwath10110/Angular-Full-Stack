import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';

import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

var mongoDB = '';

if (process.env.NODE_ENV === 'test') {
  mongoDB = 'mongodb://admin:admin@ds111895.mlab.com:11895/mfb-db';
}
else{
  mongoDB = 'mongodb://admin:admin@ds111895.mlab.com:11895/mfb-db';  
}

mongoose.connect(mongoDB, {
  useMongoClient: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
   
   console.log('Connected to MongoDB');

  setRoutes(app);

  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  if (!module.parent) {
    app.listen(app.get('port'), () => {
      console.log('Angular Full Stack listening on port ' + app.get('port'));
    });
  }
});

export { app };
