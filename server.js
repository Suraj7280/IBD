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

// Check if username or email already exists
app.get('/checkUser', (req, res) => {
  const { username, email } = req.query;
  const query = `SELECT * FROM register WHERE username='${username}' OR email='${email}'`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ exists: results.length > 0 });
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


app.get('/symptomsuggestion/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  const sql = `SELECT * FROM symptoms WHERE username = ${userId} ORDER BY id DESC LIMIT 1`;
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


app.post('/trigger_data', (req, res) => {
  // Extract user data from request body
  const { User_ID, Spicy_Foods, Raw_Vegetables, Dairy_Products, High_Fiber_Foods, Alcohol, Processed_Foods, Nuts, Fried_Foods } = req.body;

  // Insert user data into MySQL database
  const sql = `INSERT INTO trigger_data (User_ID, Spicy_Foods, Raw_Vegetables, Dairy_Products, High_Fiber_Foods, Alcohol, Processed_Foods, Nuts, Fried_Foods)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [User_ID, Spicy_Foods, Raw_Vegetables, Dairy_Products, High_Fiber_Foods, Alcohol, Processed_Foods, Nuts, Fried_Foods];
  console.log(values)

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting user data into database:', err);
      res.status(500).json({ error: 'Error inserting user data into database' });
      return;
    }
    console.log('User data inserted into database');
    res.json({ message: 'User data inserted successfully' });
  });
});




// Route to fetch user-item data from the database
app.get('/recommendations/:userId', (req, res) => {
  const { userId } = req.params;
  
  // Query to fetch user-item data from the database
  const query = 'SELECT * FROM trigger_data';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user-item data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    // Process the fetched data
    const userItemData = processData(results);

    // Check if userItemData is empty or not
    if (userItemData.length === 0) {
      return res.status(404).json({ error: 'No user-item data found' });
    }

    // Get recommendations for the user
    const recommendations = getRecommendations(userItemData, userId);

    // Send recommendations as JSON response
    res.json({ userId, recommendations });
  });
});

// Function to process fetched data from the database
function processData(results) {
  // Initialize an empty array to store formatted data
  const formattedData = [];

  // Loop through the fetched data
  results.forEach(row => {
    formattedData.push({
      User_ID: row.User_ID,
      Spicy_Foods: row.Spicy_Foods,
      Raw_Vegetables: row.Raw_Vegetables,
      Dairy_Products: row.Dairy_Products,
      High_Fiber_Foods: row.High_Fiber_Foods,
      Alcohol: row.Alcohol,
      Processed_Foods: row.Processed_Foods,
      Nuts: row.Nuts,
      Fried_Foods: row.Fried_Foods
    });
  });

  // Return the formatted data
  return formattedData;
}

// Function to calculate cosine similarity between two vectors
function calculateCosineSimilarity(vector1, vector2) {
  // Calculate dot product
  const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);

  // Calculate magnitudes
  const magnitude1 = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));

  // Calculate cosine similarity
  const similarity = dotProduct / (magnitude1 * magnitude2);

  return similarity;
}

// Function to get recommendations for a user
function getRecommendations(data, userId) {
  // Find user data
  console.log('userId:', userId);
  
  // Log the types of userId and User_ID to check for mismatches
  const user = data.find(item => item.User_ID === parseInt(userId));
  console.log('user:', user);
  if (!user) {
    return [];
  }

  // Calculate cosine similarity with other users
  const similarities = data
    .filter(item => item.User_ID !== userId) // Exclude the user itself
    .map(item => ({
      userId: item.User_ID,
      similarity: calculateCosineSimilarity(Object.values(user).slice(1), Object.values(item).slice(1)) // Exclude User_ID
    }))
    .sort((a, b) => b.similarity - a.similarity); // Sort by similarity in descending order

  // Return list of most similar users (recommendations)
  return similarities.slice(1, 6); // Return top 5 similar users as recommendations
}

// Define endpoint to join tables
app.get('/medicationfood', (req, res) => {
  const query = `
  SELECT *
  FROM medication
 JOIN food ON medication.username = food.username
  ORDER BY medication.date_added DESC, food.date DESC
`;

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    // Send the joined data as a JSON response
    res.json(results);
  });
});
  
app.get('/medicationfood/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId); // Ensure userId is correct

  const query = `
    SELECT *
    FROM medication
    JOIN food ON medication.username = food.username
    WHERE medication.username = ?
    ORDER BY medication.date_added DESC, food.date DESC
  `;

  // Execute the query
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    // Send the joined data as a JSON response
    res.json(results);
  });
});






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
