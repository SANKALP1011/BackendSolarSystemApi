const express = require("express");
const mysql = require("mysql");
const app = express();

const connection =   mysql.createConnection({
  "host": "127.0.0.1",
  "user": "root",
  "database": "SolarApi",
  "port": "3306",
  "password": "happybarca1011"
});

connection.connect(function(err,res){
 if (err){
   console.log(err)
 }
 else{
   console.log("Succesfully connected");
 }
})


app.set("view engine","ejs");





app.get("/",function(req,res){
  var data = "select* from Planets";
  connection.query(data,function(err,result){
      if (err){
        console.log("error fetching");
      }
      else{
        console.log(result)
        res.send(result);
      }
  })
});

app.listen("3000",function(){
    console.log("Server is up and running")
});
