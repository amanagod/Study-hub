const mongoose = require('mongoose');
require('dotenv').config();

const conn = mongoose.createConnection(process.env.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

conn.on('connected', () => {
  console.log('Data database connection successful');
});

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  discription: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Data = conn.model('Data', dataSchema);

module.exports = Data;
