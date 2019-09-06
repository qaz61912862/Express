var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.get('/list', function(req, res, next) {
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

router.get('/detail', function(req, res, next) {
  const id = req.query.id;
  const result = getDetail(id)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
});

router.post('/new', function(req, res, next) {
  const data = req.body
  const result = newBlog(data)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
});

router.post('/update', function(req, res, next) {
  const id = req.query.id
  const data = req.body
  const result = updateBlog(id, data)
  return result.then((detail) => {
    res.json(
      new SuccessModel(detail, 'success')
    )
  })
});

router.post('/del', function(req, res, next) {
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
