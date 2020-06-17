const express = require('express')
const path    = require('path')
const mysql   = require('mysql')
const router  = express.Router() 
const Doctor = require('../core/Doctor')
const Patient = require('../core/Patient')
const Receptioniste = require('../core/Receptioniste')


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12301230",
    database: 'Clinique',
  });
  
con.connect( (err) => {
    if (err) return err
})

router.get("/",(req,res)=>{
  let user = req.session.user ;
  if(!user) return res.redirect("/")
  con.query(`SELECT * FROM Doctor WHERE id = ${req.session.user.id}` , (err,row) => {
    if(err) console.log( err ) 
  res.render("./Doctor/Profile.ejs",{ Patient : row })
  })
})

router.post("/",(req,res)=>{
  let user = req.session.user ;
  if(!user) return res.redirect("/")
  con.query(`INSERT INTO Doctor ( First_Name , Last_Name , Phone_Number ) VALUES ( '${req.body.First_Name}' , '${req.body.Last_Name}' ,'${req.body.Phone_Number}' ) ; ` , (err,row)=>{
    if(err) console.log( err ) 
      res.redirect("./Doctor")
  })
})

router.get("/Patient",(req,res)=>{
  let user = req.session.user ;
  if(!user) return res.redirect("/")
  con.query(`SELECT * FROM Patient WHERE Doctor = '${user.Last_Name}' ;`, (err,rows) => {
    if(err) console.log(err)
    res.render("./Doctor/Patient.ejs",{Patient : rows})
  }) 
})

router.get("/Consultation",(req,res)=>{
  let user = req.session.user ;
  if(!user) return res.redirect("/")
  con.query(`SELECT * FROM Patient WHERE Doctor = '${user.Last_Name}' ;`, (err,rows) => {
    if(err) console.log(err)
    con.query(`SELECT * FROM Consultation WHERE Doctor = '${user.Last_Name}' ;`, (err,row) => {
      if(err) console.log(err)
    
  res.render("./Doctor/Consultation.ejs",{ Patient : rows, Consultation : row } )
})
})
})

router.post("/Consultation",(req,res)=>{
  con.query(`INSERT INTO Consultation ( Date , Hour , Patient , Doctor)  Values ( '${req.body.Date}' ,'${req.body.Hour}' ,'${req.body.Patient}' , '${req.session.user.Last_Name}' ) ; `, (err,rows) => {
    if(err) console.log(err)
  res.redirect("/Doctor/Consultation")
})
})

router.get("/Consultation/:id",(req,res)=>{
  con.query(`DELETE FROM Consultation WHERE id = '${req.params.id}' ; `, (err,rows) => {
    if(err) console.log(err)
  res.redirect("/Doctor/Consultation")
})
})

router.get('/Logout', (req, res, next) => {
  // Check if the session is exist
  if(req.session.user) {
      req.session.destroy( () => { res.redirect('/') }
      );
  }
});

module.exports = router;