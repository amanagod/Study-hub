const mongoose = require('mongoose');
require('dotenv').config();

const conn = mongoose.createConnection(process.env.urlcha);

conn.on('connected', () => {
  console.log('Chats database connection successful');
});

const chatSchema = new mongoose.Schema({
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
});

const Chat = conn.model('Chat', chatSchema);

module.exports = Chat;
