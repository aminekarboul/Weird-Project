const express = require('express')
const path    = require('path')
const mysql   = require('mysql')
const router  = express.Router() 
const Doctor = require('../core/Doctor')
const Patient = require('../core/Patient')
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

const patient = new Patient()
const doctor  = new Doctor()
const receptioniste = new Receptioniste()


router.get("/",(req,res)=> {
    res.render("./login")
})

router.post('/', (req, res, next) => {
    try{ 
        con.query(`SELECT * FROM Patient WHERE Email = "${req.body.Email}" ;`,(err,rows) => {
            if(err) console.log( err )  
            if(rows)  {
                patient.login( req.body.Email , req.body.Password ,(result) => {
                    if(result) {
                        // Store the user data in a session.
                        req.session.user = result ;
                        req.session.opp  = 1 ;
                        // redirect the user to the home page.
                        res.redirect('/Patient') ;
                    }
                })
            }
        }) 
        con.query(`SELECT * FROM Receptioniste WHERE Email = "${req.body.Email}" ;`,(err,rows) => {
            if(err) console.log( err )
            if(rows)  {
                receptioniste.login( req.body.Email , req.body.Password ,(result) => {
                    if(result) {
                        // Store the user data in a session.
                        req.session.user = result ;
                        req.session.opp  = 1 ;
                        // redirect the user to the home page.
                        res.redirect('/Receptioniste') ;
                    }
                })
            }
        })
        con.query(`SELECT * FROM Doctor WHERE Email = "${req.body.Email}" ;`,(err,rows) => {
            if(err) console.log( err )  
            if(rows)  {
                doctor.login( req.body.Email , req.body.Password , (result) => {
                    if(result) {
                        // Store the user data in a session.
                        req.session.user = result ;
                        req.session.opp  = 1 ;
                        // redirect the user to the home page.
                        res.redirect('/Doctor') ;
                    }
                })
            }
        })
    }
    catch {
            res.redirect('/') 
        }
    })

module.exports = router;