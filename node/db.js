import mysql from "mysql2"


const db = mysql.createConnection({
host: "localhost",
user:"root",
password:"12345",
database:"todo"

});

db.connect((err)=>{
    if (err)console.log(err);
    else console.log("Your Database is connected Successfully!!");

});

export default db;