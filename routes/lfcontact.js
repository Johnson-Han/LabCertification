var express = require('express');
var router = express.Router();
var pg1 = require('./pgconn');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('lfcontact', { title: "文档系统" });
});

router.get('/:post_name', function (req, res, next) {
  // console.log(req.params)
  res.render('page_lf_contact', { title: req.params.post_name });
})


module.exports = router;
