// 处理404
var createError = require('http-errors');
// 工具
var express = require('express');
// 路径工具
var path = require('path');
// 处理cookie
var cookieParser = require('cookie-parser');
// 记录日志
var logger = require('morgan');
// 定义路由文件
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const session = require('express-session');
const RedisStore = require('connect-redis')(session)


// 生成实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 写日志
app.use(logger('dev'));
// 解析post方法data里面数据格式
app.use(express.json());
// 解析post urlencoded格式
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(session({
  secret: '123abczzz',
  cookie: {
    path: '/',  //默认配置
    httpOnly: true, //默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}));

// 处理路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);


// catch 404 and forward to error handler
// 找不到路由，返回404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 抛出错误，判断环境，开发环境暴露错误，否则返回空值

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
