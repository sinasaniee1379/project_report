const express = require("express");
const projectDB = require("./../DB/projectDB");
const userRoutes = express.Router();

userRoutes.post("/register", (req, res) => {
  const body = req.body;
  let userRegister = `INSERT INTO register VALUES ('${body.username}','${body.fullname}','${body.birth}','${body.phone}','${body.password}',NULL,'${body.level}')`;
  projectDB.query(userRegister, (error, result) => {
    if (error) {
      console.log("Insert user faild", error);
      res.send(null);
    } else {
      res.send({
        username: body.username,
        birth: body.birth,
        phone: body.phone,
        status: true,
        message: "شما با موفقیت وارد شدید",
        id: result?.insertId,
      });
      console.log("1 user registered");
    }
  });
  // projectDB.connect((err) => {
  //   if (err) {
  //     console.log("you have a error", err);
  //   } else {

  //   }
  // });
});

userRoutes.post("/login", (req, res) => {
  const body = req.body;
  let userLogin = `SELECT username, fullname, birth, phone, password, id, level FROM register WHERE username="${body.username}" AND password="${body.password}"`;
  projectDB.query(userLogin, (error, result) => {
    const resultData = result[0];
    if (error) {
      console.log("login faild", error);
      res.send(null);
    } else {
      console.log(result[0]);
      res.send({
        username: resultData.username,
        birth: resultData.birth,
        phone: resultData.phone,
        status: true,
        message: `${resultData.username} خوش آمدید`,
        level: resultData.level,
        fullname: resultData.fullname,
        id: resultData.id,
      });
      // let login = `INSERT INTO login VALUES ('${resultData.id}','${resultData.username}','${resultData.password}','${resultData.level}')`;
      // projectDB.query(login);
      console.log("user login");
    }
  });
  // projectDB.connect((err) => {
  //   if (err) {
  //     console.log("you have a error", err);
  //   } else {

  //   }
  // });
});

userRoutes.delete("/logout", (req, res) => {
  const body = req.body;
  console.log(body);
  let userLogout = `DELETE FROM login WHERE id="${body.id}"`;
  projectDB.query(userLogout, (error, result) => {
    if (error) {
      console.log("logout faild", error);
      res.send(null);
    } else {
      res.send({
        status: true,
      });
    }
  });
});

userRoutes.post("/reportUser", (req, res) => {
  const body = req.body;
  console.log(body);
  const date = new Date().toLocaleDateString("fa-IR");
  let userReport = `INSERT INTO report VALUES ('${body.id}','${body.text}','${body.score}','${date}')`;
  projectDB.query(userReport, (error, result) => {
    if (error) {
      console.log("Insert report faild", error);
      res.send(error);
    } else {
      console.log("Insert report successfully");
      let listReport = `SELECT * FROM report WHERE id = ${body.id}`;
      projectDB.query(listReport, (err, resu) => {
        res.send(resu);
      });
    }
  });
});

userRoutes.get("/report", (req, res) => {
  const id = req.query.id;
  console.log("Connect to DB successfully");
  if (id) {
    let getReport = `SELECT * FROM report WHERE id=${id} `;
    projectDB.query(getReport, (error, result) => {
      if (error) {
        console.log("get user report faild", error);
        res.send(null);
      } else {
        console.log("insert report successfully");
        res.send(JSON.stringify(result));
      }
    });
  } else {
    res.send([]);
  }
});

module.exports = userRoutes;
