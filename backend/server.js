const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Add this

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Add this

// Fruit Schema and Model
const fruitSchema = new mongoose.Schema({
  name: String,
  color: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

.post('/fruits', async (req, res) => {
    try {
      const { name, color } = req.body;
      const newFruit = new Fruit({ name, color });
      await newFruit.save();
      res.status(201).json(newFruit);
    } catch (error) {
      res.status(500).json({ message: 'Error adding fruit' });
    }
  });
// GET route for fetching fruits
app.get('/fruits', async (req, res) => {
    try {
      const fruits = await Fruit.find();
      res.json(fruits);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching fruits' });
    }
  });

// Connect to MongoDB and start server
mongoose
  .connect('mongodb+srv://arshbajwa534:GbQhVbu5eNcbkNBi@cluster0.airnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
