// 处理404
var createError = require('http-errors');
// 工具
var express = require('express');
// 路径工具
var path = require('path');
var fs = require('fs')
// 处理cookie
var cookieParser = require('cookie-parser');
// 记录日志
var logger = require('morgan');
// 定义路由文件
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
const carRouter = require('./routes/car');


const session = require('express-session');
const RedisStore = require('connect-redis')(session)


// 生成实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
// 写日志
if (ENV !== 'production') {
  // 开发环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}


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

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
// 处理路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/car', carRouter);
// app.use('/api/err', () => {
//   throw new Error('error')
// })

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
