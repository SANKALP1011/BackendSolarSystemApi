const e = require("express");
const express = require("express");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const app = express();

var dataConnectionCredentials = ({
  "host": "us-cdbr-east-05.cleardb.net",
  "user": "bffcfd0a0c6b1e",
  "database": "heroku_8d4f798c6cce060",
  "port": "3306",
  "password": "27a4bb67"
});

/* This handles the error when the database connection is lost */
function handleDisconnect() {
  connection = mysql.createConnection(dataConnectionCredentials); //Creating and recreating the connection when the connection is lost or
  connection.connect(function (err) {
    // The server is either down
    if (err) {
      //  or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect and solve the issue.
    } else {
      console.log("Database connected successfully"); //This lines shows if the database is connected successfully.
    }
  });
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // If it gets the following error(when connection is lost), then
      handleDisconnect(); // We will call the function and restart the connection again.
    } else {
      // Otherwise throw the error and then again the call the function.
      throw err; // Handles error
    }
  });
}
handleDisconnect();  

app.set("view engine","ejs");

//Get route is tested using postman and it's working properly..    
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

app.get("/:Name",function(req,res){
  var name = req.params.Name;
  console.log(name)
  var query = "select* from Planets where Name = ?";
  connection.query(query,[name],function(err,result){
    if (err){
      console.log(err)
    }
    else{
      res.send(result);
    }
  })

})

app.listen(process.env.PORT || "3000",function(){
    console.log("Server is up and running")
});
