var express = require('express');
const { login }  = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
// const { set, get }  = require('../db/redis')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 *1000))
  return d.toGMTString()
}
var router = express.Router();

router.post('/login', function(req, res, next) {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then((data) => {
    if (data && data.username) {
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(new SuccessModel(result, '登录成功'))
      // return
    } else {
      res.json(new ErrorModel('账号密码错误'))
    }
  })
});

router.get('/login-test', (req, res, next) => {
  const session = req.session;
  if (session.username) {
    res.json({
      errno: 0,
      msg: '已登录'
    })
  } else {
    res.json({
      errno: -1,
      msg: '未登录'
    })
  }
})


module.exports = router;
