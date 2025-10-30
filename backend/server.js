import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const ProductSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number
});

const Product = mongoose.model('Product', ProductSchema);

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

app.listen(5000, () => console.log('Server running on port 5000'));
