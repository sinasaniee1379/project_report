const mysql = require("mysql");

const projectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reportpanel",
});

module.exports = projectDB;
