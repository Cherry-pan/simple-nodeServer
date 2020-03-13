let express = require("express");
let app = express();
var mysql = require("mysql");
var md5 = require("md5");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var connection = mysql.createConnection({
  host: "47.99.160.107",
  user: "root",
  password: "199875",
  database: "xxxppp"
});

connection.connect();

app.get("/userinfo", function(req, res) {
  connection.query("SELECT * FROM t_user", function(error, results, fields) {
    if (error) return res.json(error);
    res.json(results);
  });
});

app.post("/login_f", function(req, res) {
  let tel = req.body.tel;
  connection.query(
    `SELECT COUNT(*) as count FROM t_user WHERE phonenumber = ${tel}`,
    function(error, results, fields) {
      if (error) return res.json(error);
      res.json(results[0]);
    }
  );
});

app.post("/register", function(req, res) {
  let vipnumber = "";
  for (let i = 0; i < 13; i++) {
    vipnumber += Math.floor(Math.random() * 10) + "";
  }
  let tel = req.body.tel;
  connection.query(
    `INSERT INTO t_user VALUES(id,'${tel}','${tel}','2019-12-09 00:00:00','${vipnumber}',null,null,null,null,0,0,0)`,
    function(error, results, fields) {
      if (error) return res.json(error);
      res.json(results);
    }
  );
});

app.get("/meauslist", function(req, res) {
  connection.query("SELECT * FROM t_menu", function(error, results, fields) {
    if (error) return res.json(error);
    res.json(results);
  });
});

app.get("/goodslist", function(req, res) {
  let typeid = req.query.typeid;
  connection.query(
    `SELECT * FROM t_goodlist where typelist = ${typeid}`,
    function(error, results, fields) {
      if (error) return res.json(error);
      res.json(results);
    }
  );
});

app.get("/shopAddress", function(req, res) {
  connection.query("SELECT * FROM t_shopAddress", function(
    error,
    results,
    fields
  ) {
    if (error) return res.json(error);
    res.json(results);
  });
});

app.listen(8666, function() {
  console.log("程序已启动");
});
