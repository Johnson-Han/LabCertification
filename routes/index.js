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
  // console.log(req.file);
  // console.log(process.cwd());
  var upfdate = Date.now();
  var newDate = new Date();
  var filename='';
  var localOffset = newDate.getTimezoneOffset() * 60000;

  var upftime = newDate.toISOString();
  console.log(upftime);
  if (req.file != null){
  newDate.setTime(upfdate + localOffset);
  var filepath = "/files/" + req.file.filename;
  sql = 'insert into cer_files (cer_index,origin_name,filename,file_addr,upload_date) values (\'{' + req.body.id + '}\',\'' + req.file.originalname + '\',\''  + req.file.filename + '\',\''  + filepath+ '\',\'' + upftime + '\')';
  console.log(sql);
  pg2.query(sql, function (result) { });
  }
  
  console.log("2");
  if (req.body.key != ''){ 
    sql1 = 'insert into cer_keys (cer_index,cer_key,upload_date)  values (\'' + req.body.id + '\',\'' + req.body.key + '\',\'' + upftime + '\')';
    pg2.query(sql1, function (result) { });
    console.log(sql1);
    
  }

  console.log("3");

  if (req.body.rt != ''){
    sql2 = 'insert into cer_rt (cer_index,cer_rt,upload_date)  values (\'' + req.body.id + '\',\'' + req.body.rt + '\',\'' + upftime + '\')';
    console.log(sql2);
    pg2.query(sql2, function (result) { });
  }



  Wurl = '/' ;
  res.redirect(Wurl);

})

router.get('/add_new_contact', function (req, res, next) {
  res.render('lfnewcontact', { title: '检验检测机构资质评定审查' });
});

router.get('/add_new_subject', function (req, res, next) {
  res.render('lfnewsubject', { title: '检验检测机构资质评定审查' });
});


var storage1 = multer.diskStorage({
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

//新建工作联系单
// var upload = multer({ dest: '/Users/hanlf/gitHub/docs_web/public/files' })
router.post('/lf_contract_add', multer({ storage: storage1 }).single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  // console.log(process.cwd());
  var upfdate = Date.now();
  var newDate = new Date();
  var localOffset = newDate.getTimezoneOffset() * 60000;

  newDate.setTime(upfdate + localOffset);
  var filepath = "/files/" + req.file.filename;

  var upftime = newDate.toISOString();

  sql = 'insert into  lab_files_subject (subject,creator,create_date) values (\'' + req.body.subject + '\',\'' + req.body.creator + '\',\''   + upftime + '\') ; insert into  cer_files (filename,file_addr,upload_date,cer_index,subject) values (\'' + req.file.filename + '\',\'' + filepath + '\',\'' + upftime + '\',\'' + req.body.cer_index + '\',\''+req.body.subject+'\');';

  console.log(sql);


  pg2.query(sql, function (result) {});
  
  Wurl = '/lfcontact/' + req.body.name;
  res.redirect(Wurl);

})





//补充联系单的添加路由
router.post('/lf_subject_add', multer({ storage: storage1 }).single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  // console.log(process.cwd());
  var upfdate = Date.now();
  var newDate = new Date();
  var localOffset = newDate.getTimezoneOffset() * 60000;

  newDate.setTime(upfdate + localOffset);
  var filepath = "/files/lf1/工作联系单/" + req.file.filename;

  var upftime = newDate.toISOString();
  sql = 'insert into param_requirement (subject,contact_from,contact_to,file_addr,name,re_sign_date,filename,note) values (\'' + req.body.subject + '\',\'' + req.body.contact_from + '\',\'' + req.body.contact_to + '\',\'' + filepath + '\',\'' + req.body.name + '\',\'' + upftime + '\',\'' + req.file.filename + '\',\'' + req.body.note + '\')';


  console.log(sql);
  pg2.query(sql, function (result) { });
  Wurl = '/lfcontact/' + req.body.name;
  res.redirect(Wurl);

})

//回复联系单的添加路由
router.post('/lf_reply_add', multer({ storage: storage1 }).single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  // console.log(process.cwd());
  var upfdate = Date.now();
  var newDate = new Date();
  newDate.setTime(upfdate);
  var filepath = "/files/lf1/工作联系单/" + req.file.filename;
  var upftime = newDate.toISOString();
  sql = 'insert into param_reply (subject,reply_from,file_addr,name,reply_date,filename,note) values (\'' + req.body.subject + '\',\'' + req.body.reply_from + '\',\'' + filepath + '\',\'' + req.body.name + '\',\'' + upftime + '\',\'' + req.file.filename + '\',\'' + req.body.note + '\')';


  console.log(sql);
  pg2.query(sql, function (result) { });
  Wurl = '/add_new_subject';
  res.redirect(Wurl);

})




module.exports = router;
