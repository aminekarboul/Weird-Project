const pool = require('./pool');



function Patient() {};

Patient.prototype = {
    // Find the user data by id or username.
    find : function( user = null , callback )
    {
        // if the user variable is defind
        if(user) {
            // if user = number return field = id, if user = string return field = username.
           var query = Number.isInteger(user) ? 'id' : 'Email';
        }
        // prepare the sql query
        let sql = `SELECT * FROM Patient WHERE ${query} = ?`;


        pool.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    // This function will insert data into the database. (create a new user)
    // body is an object 
   /* create : function(body, callback) 
    {
        var pwd = body.password;
        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd,10);
        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for(prop in body){
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO patients (FirstName, LastName, Email, Password ) VALUES (?, ?, ?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },*/

    login : function(Email, password, callback)
    {
        // find the user data by his Email.
        this.find(Email, function(user) {
            // if there is a user by this Email.
            if(user) {
                // now we check his password.
                if(password == user.Password) {
                    // return his data.
                    callback(user);
                    return;
                }  
            }
            // if the username/password is wrong then return null.
            callback(null);
        });
        
    }

}

module.exports = Patient;