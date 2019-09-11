var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const LoginCheck  = require('../middleware/loginCheck')

router.get('/list', LoginCheck, function(req, res, next) {
  console.log(LoginCheck)
  // if (req.session.username == null) {
  //   res.json(
  //     new ErrorModel('未登录')
  //   )
  //   return
  // }
  // console.log(LoginCheck(req, res, next))
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  const result = getList(author, keyword)
    return result.then(listData => {
      // console.log(new SuccessModel(listData, 'success'))
      res.json(
        new SuccessModel(listData, 'success')
      )
    })
});

router.get('/detail', LoginCheck, function(req, res, next) {
  const id = req.query.id;
  const result = getDetail(id)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
});

router.post('/new', LoginCheck, function(req, res, next) {
  const data = req.body
  const result = newBlog(data)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
});

router.post('/update', LoginCheck, function(req, res, next) {
  const id = req.query.id
  const data = req.body
  const result = updateBlog(id, data)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
});

router.post('/del', LoginCheck, function(req, res, next) {
  const id = req.query.id
  let author = req.session.username
  const result = deleteBlog(id, author)
  return result.then((detail) => {
    console.log(detail)
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
});
module.exports = router;
