const dotenv = require('dotenv');
const multer = require('multer');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const indexRouter = require('./routes/node_board');
const app = express();
const nunjucks = require('nunjucks');


app.set("port", process.env.PORT || 3000);
nunjucks.configure('views', {
    express: app,
    autoescape: true
});
app.set('view engine', 'html');
app.set('views', path.join(__dirname, "views"));
app.use('/user', indexRouter);

dotenv.config();


app.use(morgan('dev')); 
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use('/static', express.static('/views')); //  localhost/static을 url로 입력하면 views 폴더에 접근가능!
app.use('/files',express.static('/public'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true
    },
    name : 'session-cookie'
}));

app.use((req, res, next) => {
    console.log('server start');
    next();
},(req, res, next) => {
    try{
        console.log(process.env.COOKIE_SECRET);
        next();
    } catch (error) {
        next(error);
    }
});

app.get('/',(req, res) => {
    // res.sendFile(path.join(__dirname,'views/main', 'main.html'));
    res.render('main/main.html');
});



app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
    error.status = 404;
    next(error);
});


app.use((err, req, res, next) => {
    const re = /[\w\.\:]+[\d]+/g;
    const err_parse = err.stack.split('\n')[1].trim().match(re);

    res.locals.err_parse = err_parse;
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    console.log(process.env.NODE_ENV);
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.log("3000번 포트에서 실행중입니다.");
});