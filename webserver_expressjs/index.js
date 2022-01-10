const express = require('express')
const app = express();
const port = 3000;


app.use(express.urlencoded({
  extended: true
}))

var cors = require('cors');
app.use(cors());


var mysql = require('mysql')
var con = mysql.createConnection({
  host: '2001:648:2ffc:1227:a800:ff:fea3:3ecf',
  user: 'user',
  password: 'User123456!',
  database: 'pay2win'
})


app.get('/register', (req, res) => {
  let email = req.query.email;
  let soba = req.query.soba;
  let comment = req.query.comment;
  let nagrada = req.query.nagrada;
  let opis = req.query.opis;
  let zacetek = req.query.zacetek;
  let davek = req.query.davek;
  let money = req.query.money;
  let picture = req.query.picture;
    console.log(email)
    console.log()
    
const myArray = soba.split("=");

    console.log(myArray[0].replace("zacetek",""))
    console.log(myArray[1])
    console.log()
    console.log(comment)
    console.log()
    console.log(nagrada)
    console.log()
    console.log(opis)
    console.log()
    console.log(zacetek)
    console.log()
    console.log(soba)
    console.log()
    console.log(davek)
    console.log()
    console.log(picture)
  
    let sql = `INSERT INTO user (username,password,email,name,surname,taxnumber,phone,picture,money)
VALUES ("${nagrada}","${opis}","${myArray[0].replace("zacetek","")}","${myArray[1]}","${davek}","${email}","${comment}","${picture}",${money});`;
    con.query(sql, function(err, data, fields) {  
      if (err) throw err;
      res.json(
        data
      )
    })
  });

app.get('/submit-form', (req, res) => {
  let email = req.query.email;
  let soba = req.query.soba;
  let comment = req.query.comment;
  let nagrada = req.query.nagrada;
  let opis = req.query.opis;
  let zacetek = req.query.zacetek;
  let davek = req.query.davek;
  let game_id = req.query.game_id;
    console.log(email)
    console.log()
    
const myArray = soba.split("=");

    console.log(myArray[0].replace("zacetek",""))
    console.log(myArray[1])
    console.log()
    console.log(comment)
    console.log()
    console.log(nagrada)
    console.log()
    console.log(opis)
    console.log()
    console.log(zacetek)
  
    let sql = `INSERT INTO game_loby (id,game_name,davek_igre,tourtament_id,server_id,status, Igralcev, game_sum, opis, name, Game_id,time)
VALUES (${game_id},"${email}",${davek},1,1,1, ${comment}, ${nagrada}, "${opis}", "${myArray[0].replace("zacetek","")}", 1,"${myArray[1]}");`;
    con.query(sql, function(err, data, fields) {  
      if (err) throw err;
      res.json(
        data
      )
    })
  });


//za vse igre
app.get('/games', function(req, res) {
  let sql = `SELECT * FROM Game`;
  con.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});

// za vse tourtamente 
app.get('/tourtaments', function(req, res) {
  let sql = `SELECT * FROM tourtament`;
  con.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});


//za vse userje
app.get('/users', function(req, res) {
  let sql = `SELECT * FROM user`;
  con.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});


app.get('/loby', async function(req, res) {
  let ime = req.query.ime
   
  if(ime==undefined){
    res.json("")
    return;
  }
  let sql = `SELECT * FROM  game_loby 
  WHERE id=${ ime } `;
  con.query(sql, function(err, data, fields) {
   
    if (err) throw err;
    res.json(
      data
    )
    
  })
  
});

app.get('/tourtament', async function(req, res) {
  let ime = req.query.ime
 
  if(ime==undefined){
    res.json("")
    return;
  }
  let sql = `SELECT * FROM  tourtament 
  WHERE id=${ ime } `;
  con.query(sql, function(err, data, fields) {
   
    if (err) throw err;
    res.json(
      data
    )
    
  })
  
});

app.get('/get-cs-loby', async function(req, res) {
 
  let sql = `SELECT * FROM  game_loby 
  WHERE game_name="Counter Strike GO"`;
  con.query(sql, function(err, data, fields) {
   
    if (err) throw err;
    res.json(
      data
    )
    
  })
  
});



app.get('/get-lol-loby', async function(req, res) {
 
  let sql = `SELECT * FROM  game_loby 
  WHERE game_name="League of Legends"`;
  con.query(sql, function(err, data, fields) {
   
    if (err) throw err;
    res.json(
      data
    )
    
  })
  
});
app.get('/get-loby', async function(req, res) {
 
  let sql = `SELECT * FROM  game_loby `;
  con.query(sql, function(err, data, fields) {
   
    if (err) throw err;
    res.json(
      data
    )
    
  })
  
});
app.get('/users-loby',  function(req, res) {
  let id = req.query.id
  let sql = `select u.username, u.picture,u.email from user u
  inner join game_loby_has_user gl on gl.user_id=u.id
  
  where gl.game_loby_id=${id}`;
  con.query(sql, function(err, data, fields) {
   
    if (err) throw err;
    res.json(
      data
    )
    
  })
  
});

app.get('/add-loby',  function(req, res) {
  let id = req.body.ime
  console.log(id)
  res.end()
  
});


//za vse userje
app.get('/users', function(req, res) {
  let sql = `SELECT * FROM user`;
  con.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});

app.get('/userid', function(req, res) {  
  let sql = "SELECT * FROM user where id=?";
  con.query(sql,req.query.id, function(err, data, fields) {
    if (err) throw err;
    res.json(data)    
  })  
});

app.get('/login', function(req, res) {  
  let sql = `SELECT * FROM user where username = ? and password = ?`;
  con.query(sql,[req.query.user,req.query.pass], function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});

app.post('/usrmoney', function(req, res) {  
  let sql="";
  if(req.query.money>=0){ sql = `update user set money= money + ? where id = ?`;}
  else{ sql = `update user set money= money + ? where id = ?`;}
  con.query(sql,[req.query.money,req.query.id], function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});
app.post('/usremail', function(req, res) {  
  let sql=`update user set email =  ? where id = ?`;
  con.query(sql,[req.query.email,req.query.id], function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});
app.post('/usrpass', function(req, res) {  
  let sql=`update user set password =  ? where id = ?`;
  con.query(sql,[req.query.pass,req.query.id], function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});
app.post('/usrusr', function(req, res) {  
  let sql=`update user set username =  ? where id = ?`;
  con.query(sql,[req.query.user,req.query.id], function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});

app.get('/forma', function(req, res) {
  let sql = `select max(id) as id from game_loby `;
  con.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});

app.get('/user_game_loby_add', function(req, res) { 
  console.log("kle pride") 
  let sql=`insert into game_loby_has_user (game_loby_id,game_loby_Game_id,user_id) values(?,1,?)`;
  con.query(sql,[req.query.game_id,req.query.userID], function(err, data, fields) {
    if (err) throw err;
    res.json(
      data
    )
  })
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});