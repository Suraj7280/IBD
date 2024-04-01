const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

app.post('/register', (req,res) => {
  const {username,email,password } = req.body;
  const hashedPassword = bcrypt.hashSync(password,10);
  const sql = 'INSERT INTO register (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username,email,hashedPassword], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering user');
    } else {
      res.status(200).send('User registered successfully');
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query the database to find the user
  const sql = 'SELECT * FROM register WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error querying database: ', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    // Check if user exists
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];

    // Check if password is correct
    bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error('Error comparing passwords: ', bcryptErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!bcryptResult) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      // Password is correct, login successful
      return res.status(200).json({ message: 'Login successful' });
    });
  });
});



app.post('/symptoms', (req, res) => {
 

  let formData = req.body;
  console.log(formData);

  // Insert the form data into the MySQL database
  db.query('INSERT INTO symptoms SET ?', formData, (err, results) => {
    if (err) {
      console.error('Error inserting form data into database:', err);
      res.status(500).json({ error: 'An error occurred while saving the data.' });
      return;
    }
    console.log('Form data saved successfully:', formData);
    res.json({ success: true });
  });
});



// Save water intake data
app.post('/water-intake', (req, res) => {
  const { userId, amount, date } = req.body;
  const sql = `INSERT INTO water_intake (user_id, amount, date) VALUES (${userId}, ${amount}, '${date}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ success: true });
  });
});

// Fetch water intake history for a user
app.get('/water-intake/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `SELECT * FROM water_intake WHERE user_id = ${userId}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

app.get('/register/:username', (req, res) => {
  const username = req.params.username;
  const sql = `SELECT * FROM register WHERE username = ${username}`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

//food detail
app.post('/food', (req, res) => {
 

  let formData = req.body;
  console.log(formData);

  // Insert the form data into the MySQL database
  db.query('INSERT INTO food SET ?',[formData], (err, results) => {
    if (err) {
      console.error('Error inserting form data into database:', err);
      res.status(500).json({ error: 'An error occurred while saving the data.' });
      return;
    }
    console.log('Form data saved successfully:', formData);
    res.json({ success: true });
  });
});


// Endpoint to add a new symptom entry
app.get('/symptom_diary/:username', (req, res) => {
  const user = req.params.username;
  db.query('SELECT * FROM symptom_diary WHERE username = ?',[user], (error, results) => {
      if (error) {
          console.error('Error fetching symptoms:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(results);
  });
});

app.post('/symptom_diary', (req, res) => {
  const {username, symptom, description } = req.body;
  db.query('INSERT INTO symptom_diary (username,symptom,description) VALUES (?, ?,?)', [username,symptom,description], (error, results) => {
      if (error) {
          console.error('Error adding symptom:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json({ message: 'Symptom added successfully' });
  });
});

// Endpoint to delete a symptom entry by index
app.delete('/symptom_diary/:username', (req, res) => {
  const symptomId = req.params.username;

  db.query(`DELETE FROM symptom_diary WHERE username = ${symptomId}`, (error, results) => {
      if (error) {
          console.error('Error deleting symptom:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Symptom not found' });
          return;
      }
      res.json({ message: 'Symptom deleted successfully' });
  });
});

app.get('/symptoms/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const sql = `SELECT * FROM symptoms WHERE username = ${userId}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

app.get('/food/:userId', (req, res) => {
  const userId = req.params.userId;
  
  const sql = `SELECT * FROM food WHERE username = ${userId}`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

let medications = [];

// Endpoint to add medication
app.post('/medication', (req, res) => {
  const { username,name, dosage, frequency} = req.body;
  if (!name || !dosage || !frequency) {
    return res.status(400).json({ error: 'Please provide all fields.' });
  }
console.log(req.body)
  db.query('INSERT INTO medication (username,name, dosage, frequency) VALUES (?,?,?,?)', [username,name, dosage, frequency], (error, results) => {
      if (error) {
          console.error('Error adding medication:', error);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json({ message: 'Medication added successfully' });
  });
});

// Endpoint to get all medications
app.get('/medication/:username', (req, res) => {
  const userId = req.params.username;
  
  const sql = `SELECT * FROM medication WHERE username = ${userId}`;
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
