const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12301230"
  });
  
  con.connect(function(err) {
    if (err) return err;
    console.log("Connected!");
    con.query("DROP DATABASE Clinique;", function (err, result) {
      if (err) return err;
      console.log("Database Deleted")
      console.log("Press Ctrl+C to Leave the Script")
    });
});