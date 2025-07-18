const mongoose = require('mongoose');
const journalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);
