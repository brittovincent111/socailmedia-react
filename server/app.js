let  express = require('express');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')
const connection = require('./connection')


var userRouter = require('./routes/user/user');
var adminRouter = require('./routes/admin/admin');

connection();


require("dotenv").config();  

const app = express()  
app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images',express.static(path.join(__dirname,'public/images')))

app.use('/', userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  app.listen(4000,()=>{

    console.log("running port 4000")
  })


module.exports = app;

