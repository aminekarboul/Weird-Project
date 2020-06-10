
const util = require('util');
const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12301230",
    database: 'Clinique'
  });
  con.getConnection(function(err) {
    if (err) return err;
    console.log("Connected To Database Clinique!");
  })

  con.query = util.promisify(con.query)

  module.exports = con;