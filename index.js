const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3000;

let todos = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Define your routes here
app.get('/', (req, res) => {
  const now = new Date();
  const dateStr = now.toDateString();
  const timeStr = now.toTimeString().split(' ')[0];
  res.render('index', { date: dateStr, time: timeStr, todos: todos });
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  todos.push(task);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const index = parseInt(req.body.index);
  todos.splice(index, 1);
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
