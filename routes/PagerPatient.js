const express = require('express')
const path    = require('path')
const mysql   = require('mysql')
const router  = express.Router() 
const Doctor  =       require('../core/Doctor')
const Patient =       require('../core/Patient')
const Receptioniste = require('../core/Receptioniste')
//const bodyParser= require('body-parser');
//const urlencodedParser= bodyParser.urlencoded({extended:false});


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
  con.query(`SELECT * FROM Patient WHERE id = ${req.session.user.id}`, (err,row) => {
    if(err) console.log( err ) 
  res.render("./Patient/Profile.ejs",{ Patient : row })
})
})

router.post("/",(req,res)=>{
  con.query(`UPDATE Patient SET First_Name='${req.body.First_Name}' , Last_Name='${req.body.Last_Name}' , Email= '${req.body.Email}' , Phone_Number='${req.body.Phone_Number}'  WHERE id = '${req.session.user.id}'  ; `, (err,row) => {
    if(err) console.log( err )
  })
  res.redirect("/Patient")
})

router.get('/Logout', (req, res, next) => {
  // Check if the session is exist
  if(req.session.user) {
      req.session.destroy( () => { res.redirect('/') }
      );
  }
});

router.get("/Consultation",(req,res)=>{
  let user = req.session.user ;
  if(!user) return res.redirect("/")  
  con.query(`SELECT * FROM Consultation WHERE Patient ='${user.Last_Name}' `,(err,rows)=>{
    if(err) console.log(err)
    res.render("./Patient/Consultation",{Consultation : rows})
  })
})


module.exports = router;