var express = require('express');
var router = express.Router();
const { getCar }  = require('../controller/car')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const LoginCheck  = require('../middleware/loginCheck')


router.get('/carList', LoginCheck, function(req, res, next) {
  let page = req.query.page || ''
  const result = getCar(page)
    return result.then(listData => {
      res.json(
        new SuccessModel(listData, 'success')
      )
    })
});

module.exports = router;
