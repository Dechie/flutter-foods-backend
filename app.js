const express = require('express');
const mongoose = require('mongoose');
const {Category, Meal} = require('./models');

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000;

//mongoose.connect('mongodb+srv://user-food1:<password>@cluster0.pkl7diq.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
//
mongoose.connect('mongodb+srv://user-food1:user1234@cluster0.pkl7diq.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongodb connection error:'));
db.once('open', ()=>{
  console.log('Connected to the database');
});


app.listen(PORT, () => {
 console.log("Server Listening on PORT: ", PORT) 
});

app.get("/status", async (request, response) => {
  const dataFromDb = await YourModel.find();
  const status = {
    "Status": "Running"
  }

  response.send(status);
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find()

    res.json(categories);
  } catch (error) {
    console.log('Error fetching categories: ', error);
    res.status(500).send('Internal Server Error');
  } 
});

// POST endpoint for creating a new category
/*
app.post('/categories', async (req, res) => {
  try {
    const { id, title, color } = req.body;
    const newCategory = new Category({ id, title, color });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/

// POST endpoint for creating a new meal
app.post('/meals', async (req, res) => {
  try {
    const newMeal = new Meal(req.body);
    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    console.error('Error creating meal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
