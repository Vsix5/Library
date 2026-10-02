
const express = require('express');
const pool = require('./db/pool');
const app = express();
app.use(express.json());
const PORT = 5000;
app.use(express.static('public'));

app.get('/api/books', async (req, res) => {
  const { search } = req.query;
  console.log(search);
try{
  if(search){
const query = `
  SELECT * FROM books
  WHERE title ILIKE $1`;
  const values = [`%${search}%`]
  const result = await pool.query(query, values);
  res.json(result.rows);
  }
  else {
  const result = await pool.query('SELECT * FROM books');
  res.json(result.rows);
  } 
  
}
catch(err){
  console.error(err);
  res.status(500).json({
    error: 'Database query failed'
  });
}
})


app.post('/api/books', async(req, res) => {
  try {
    const {title, author, category, isbn, description, pages, price, status} = req.body;

  const query = `
  INSERT INTO books(title, author, category, isbn, description, pages, price, status)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *
`;

  const values = [title, author, category, isbn, description, pages, price, status];
  const result = await pool.query(query, values);
  res.status(201).json(result.rows[0]);
}
catch(err){
  console.error(err);
  res.status(500).json({
    error: 'Failed to create book'
  })
}
});
console.log(__dirname)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})