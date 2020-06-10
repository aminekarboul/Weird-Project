const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12301230"
  });
  
  con.connect(function(err) {
    if (err) return err;
    console.log("Connected!");
    con.query("CREATE DATABASE Clinique;", function (err, result) {
      if (err) return err;
      console.log("Database created")
    });
      
    con.query('use Clinique');

    con.query("CREATE TABLE Receptioniste ( id INT(8) NOT NULL primary key AUTO_INCREMENT, Last_Name VARCHAR(50) DEFAULT NULL, First_Name VARCHAR(50) DEFAULT NULL, Email VARCHAR(50) DEFAULT NULL , Password VARCHAR(50) DEFAULT NULL , Phone_Number INT(15)  ) ; ", (err, result) => {
        if (err) return err;
        console.log("Table Receptioniste Added")
    });

    con.query("CREATE TABLE Patient ( id INT(8) NOT NULL primary key AUTO_INCREMENT, Last_Name VARCHAR(50) DEFAULT NULL, First_Name VARCHAR(50) DEFAULT NULL,Sickness VARCHAR(50), Email VARCHAR(50) DEFAULT NULL , Password VARCHAR(50) DEFAULT NULL, Phone_Number INT(15) DEFAULT NULL,Doctor VARCHAR(50) DEFAULT NULL);", (err, result) => {
        if (err) return err;
        console.log("Table Patient Added")
    });

    con.query("CREATE TABLE Doctor ( id INT(8) NOT NULL primary key AUTO_INCREMENT, Last_Name VARCHAR(50) DEFAULT NULL , First_Name VARCHAR(50) DEFAULT NULL ,Email VARCHAR(50) DEFAULT NULL , Password VARCHAR(50) DEFAULT NULL, Phone_Number INT(15) UNSIGNED DEFAULT NULL,Departement VARCHAR(50) DEFAULT NULL,Adresse VARCHAR(50) DEFAULT NULL );", (err, result) => {
        if (err) return err;
        console.log("Table Doctor Added")
    });
      
    con.query("CREATE TABLE Departement (id INT(6) PRIMARY KEY NOT NULL AUTO_INCREMENT,Name VARCHAR(50) DEFAULT NULL);",(err, result)=> {
        if (err) return err;
        console.log("Table Departement Added ")
    });

    con.query("CREATE TABLE Consultation(id INT(6) PRIMARY KEY AUTO_INCREMENT,Date DATE NOT NULL, Hour VARCHAR(20) , Patient VARCHAR(50) DEFAULT NULL , Doctor VARCHAR(50) DEFAULT NULL );", (err, result) =>{
        if (err) return err;
        console.log("Table Consultation Added ")
      });
           
      con.query("INSERT INTO Receptioniste (id, First_Name, Last_Name ,Email , Password) VALUES ('1','admin', 'admin' , 'Admin@admin.com', '12301230');",(err, result)=> {
        if (err) return err;
        console.log("Admin User Added")
        console.log("Email :   Admin@admin.com")
        console.log("Password: 12301230")
        console.log("Press Ctrl+C to leave the script")
  })
})