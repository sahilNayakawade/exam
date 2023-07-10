const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
var connection = mysql.createConnection({
    host : 'localhost',
    port :3310,
    user : 'root',
    password : 'manager',
    database : 'exam'

});
const app = express();
app.use(cors('*'));

app.get('/', (request, response) => {
 
  const query = `SELECT * FROM book_tb`;

  connection.query(query, (error, result) => {
    if (error) {
      console.log(error);
      response.setHeader("content-type", "application/json");
      response.status(500).send(JSON.stringify({ error: 'Error retrieving data from the database.' }));
    } else {
      response.setHeader("content-type", "application/json");
      response.send(JSON.stringify(result));
    }
  });
});

app.get('/books/:author', (req, res) => {
  const author = req.params.author;
  const query = `SELECT * FROM book_tb WHERE author = '${author}'`;
  connection.query(query, (error, result) => {
        if (error) {
           console.log(error);
           response.setHeader("content-type", "application/json");
           response.status(500).send(JSON.stringify({ error: 'Error retrieving data from the database.' }));
         } else {
          response.setHeader("content-type", "application/json");
           response.send(JSON.stringify(result));
         }
  
  });
});

app.post('/books', (req, res) => {
  const { b_name, author, book_type, publishedDate,language} = req.body;
  const query = `INSERT INTO book_tb (b_name, author, book_type, publishedDate,language) VALUES ('${b_name}', '${author}', '${book_type}', '${publishedDate}','${language}')`;

  pool.query(query, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error adding Book.');
    } else {
      res.send('Book added successfully.');
    }
  });
});
app.get('/books/:author', (req, res) => {
  const id = req.params.id;
  const query = `update table book_tb set set book_type ='read' , language='Marathi' WHERE id = '${id}'`;
  connection.query(query, (error, result) => {
        if (error) {
           console.log(error);
           response.setHeader("content-type", "application/json");
           response.status(500).send(JSON.stringify({ error: 'Error retrieving data from the database.' }));
         } else {
          response.setHeader("content-type", "application/json");
           response.send(JSON.stringify(result));
         }
  
  });
});


app.listen(3004, '0.0.0.0', () => {
  console.log('Server started at http://0.0.0.0:3004');
});




























