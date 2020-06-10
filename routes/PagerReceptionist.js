const express = require('express')
const path    = require('path')
const mysql   = require('mysql')
const router  = express.Router() 
//const bodyParser= require('body-parser');
//const urlencodedParser= bodyParser.urlencoded({extended:false});


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12301230",
    database: 'Clinique',
  })
  
con.connect( (err) => {
    if (err) return err
})

router.get("/",(req,res)=>{
    let user = req.session.user ;
    if(!user) return res.redirect( "/" )
       con.query(`Select * From Receptioniste WHERE id = '${req.session.user.id}'`, (err,row)=>{
        if(err) console.log( err ) 
        res.render("./Receptioniste/Profile.ejs", {user : row} ) 
    } )
})

router.post("/",(req,res)=>{
       con.query(`UPDATE Receptioniste  SET First_Name='${req.body.First_Name}' , Last_Name='${req.body.Last_Name}' , Email= '${req.body.Email}' , Phone_Number='${req.body.Phone_Number}' , Adresse='${req.body.Adresse}'  WHERE id = ${req.session.user.id}  ;`, (err,row)=>{
        if(err) console.log( err ) 
        res.redirect("./Receptioniste") 
    } )
})

router.get("/Patient",(req,res)=>{
    let user = req.session.user ;
    if(!user) return res.redirect( "/" )
    con.query(`SELECT * FROM Patient ; ` , (err,rows)=>{
        if(err) console.log( err ) 
        con.query(`SELECT * FROM Doctor ; ` , (err,rows1)=>{
            if(err) console.log( err ) 
         res.render("./Receptioniste/Patient.ejs", { Patient : rows , Doctor : rows1} )
})
})
})

router.post("/Patient",(req,res) => {
    con.query(`INSERT INTO Patient ( First_Name , Last_Name ,Sickness, Email , Password , Phone_Number , Doctor ) VALUES ( '${req.body.First_Name}' , '${req.body.Last_Name}' , '${req.body.Sickness}', '${req.body.Email}' , '${req.body.Password}','${req.body.Phone_Number}' ,'${req.body.Doctor}' ) ;` , (err,row)=>{
     if(err) console.log( err ) 
     res.redirect("/Receptioniste/Patient") 
})
})

router.get("/Patient/:id",(req,res)=>{
    con.query(`DELETE FROM Patient WHERE id = '${req.params.id}' ;` , (err,row)=>{
     if(err) console.log( err ) 
     res.redirect("/Receptioniste/Patient") 
})
})

router.get("/Departement",(req,res)=>{
    let user = req.session.user ;
    if(!user) return res.redirect( "/" )
    con.query("SELECT * FROM Departement ; " , (err,rows)=> {
        if(err) console.log( err ) 
    res.render("./Receptioniste/Departement.ejs",{Departement : rows})
})
})

router.post("/Departement/Modify/:id",(req,res)=>{
    con.query(` UPDATE Departement  SET Name= '${req.body.Name}' WHERE id = '${req.params.id}' ;` , (err,row)=>{
        if(err) console.log( err ) 
    res.redirect("/Receptioniste/Departement")
})
})

router.post("/Departement",(req,res)=>{
    con.query(` INSERT INTO Departement ( Name ) VALUES ( '${req.body.Name}') ;` , (err,row)=>{
        if(err) console.log( err ) 
    res.redirect("/Receptioniste/Departement")
})
})

router.get("/Departement/:id",(req,res)=>{
    con.query(`DELETE FROM Departement WHERE id = '${req.params.id}' ;`, (err,row)=>{
        if(err) console.log( err )
    res.redirect("/Receptioniste/Departement")
})
})

router.get("/Consultation",(req,res)=>{
    let user = req.session.user ;
    if(!user) return res.redirect( "/" )
    res.render("./Receptioniste/Consultation.ejs")
})

router.get("/Doctor",(req,res) => {
    let user = req.session.user ;
    if(!user) return res.redirect( "/" )
    con.query(`SELECT * FROM Departement ;`, (err,row)=>{
        if(err) console.log( err )
        con.query(`SELECT * FROM Doctor ;`, (err,rows)=>{
            if(err) console.log( err )
    res.render("./Receptioniste/Doctor.ejs", {Departement : row, Doctor:rows} )    
})
})
})

router.get("/Doctor/:id",(req,res) => {
    con.query(`DELETE FROM Doctor WHERE id=${req.params.id} ; `, (err,row)=>{
        if(err) console.log( err )
    res.redirect("/Receptioniste/Doctor")    
})
})

router.post("/Doctor",(req,res) => {
    con.query(`INSERT INTO Doctor ( First_Name , Last_Name , Email , Password , Phone_Number , Departement ) VALUES ( '${req.body.First_Name}' , '${req.body.Last_Name}' ,  '${req.body.Email}' , '${req.body.Password}','${req.body.Phone_Number}','${req.body.Departement}' ) ;` , (err,row)=>{
        if(err) console.log( err ) 
    res.redirect("/Receptioniste/Doctor")
})
})

router.get("/Receptioniste",(req,res)=>{
    let user = req.session.user ;
    if(!user) return res.redirect( "/" )
    con.query(`SELECT * FROM Receptioniste ; ` , (err,rows) => {
        if(err) console.log( err )
    res.render( "./Receptioniste/Receptioniste.ejs",{Receptioniste : rows} )
})
})

router.post("/Receptioniste",(req,res)=>{
    let user = req.session.user ;
    if(!user) return res.redirect("/")
    con.query(`INSERT INTO Receptioniste ( First_Name , Last_Name , Email , Password , Phone_Number  ) VALUES ( '${req.body.First_Name}' , '${req.body.Last_Name}' , '${req.body.Email}' , '${req.body.Password}' , '${req.body.Phone_Number}' ) ; ` , (err,rows)=>{
        if(err) console.log( err )
    res.redirect("/Receptioniste/Receptioniste")
})
})

router.get("/Receptioniste/:id", (req,res) => { 
    let user = req.session.user ;
    if(!user) return res.redirect("/")
    con.query(`DELETE FROM Receptioniste WHERE id=${req.params.id} ; ` , (err,rows)=>{
        if(err) console.log( err )
    res.redirect("/Receptioniste/Receptioniste")
})
})

router.get("/Consultation",(req,res)=>{
    let user = req.session.user ;
    if(!user) return res.redirect( "/" )
    con.query("SELECT * FROM Consultation ;",(err,rows)=>{
        if(err) console.log(err)
        res.render("./Receptioniste/Consultation.ejs",{Consultation : rows})
    })
})

router.get('/Logout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        req.session.destroy( () => { res.redirect('/') }
        );
    }
})

module.exports = router 
