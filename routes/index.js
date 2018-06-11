var express = require('express');
var router = express.Router();
var multer = require('multer');
var pg2 = require('./pgconn');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '检验检测机构资质评定审查' });
});




//工作联系单的保存路径
var storage3 = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, process.cwd() + "/public/files");    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳+字段名 ，比如 1478521468943-技术需求
    //  filename2=file.originalname;
    //  filedate=Date.now();
    //  filename1=filedate+'-'+filename2;
    cb(null, Date.now() + '-' + file.originalname);
  }

});
//为数据库增加文件1
router.post('/info_add', multer({ storage: storage3 }).single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  // console.log(process.cwd());
  var upfdate = Date.now();
  var newDate = new Date();
  var localOffset = newDate.getTimezoneOffset() * 60000;

  newDate.setTime(upfdate + localOffset);
  var filepath = "/files/" + req.file.filename;

  var upftime = newDate.toISOString();
console.log(upftime)

  if( req.file.filename != null){
  sql = 'insert into cer_files (cer_index,origin_name,filename,file_addr,upload_date) values (\'' + req.body.id + '\',\'' + req.file.originalname + '\',\''  + req.file.filename + '\',\''  + filepath+ '\',\'' + upftime + '\')';
  console.log(sql);
  pg2.query(sql, function (result) { });
  }
  
  if (req.body.key != null){ 
    sql1 = 'insert into cer_keys (cer_index,cer_key,upload_date)  values (\'' + req.body.id + '\',\'' + req.body.key + '\',\'' + upftime + '\')';
    pg2.query(sql1, function (result) { });
    console.log(sql1);
    
  }
  if (req.body.rt != null){
    sql2 = 'insert into cer_rt (cer_index,cer_rt,upload_date)  values (\'' + req.body.id + '\',\'' + req.body.rt + '\',\'' + upftime + '\')';
    pg2.query(sql2, function (result) { });
    console.log(sql2);
  }



  Wurl = '/' ;
  res.redirect(Wurl);

})


module.exports = router;
