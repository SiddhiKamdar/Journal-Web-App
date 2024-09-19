const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { 
        type: String, 
        default: () => new Date().toISOString().substring(0, 10), 
        required: true 
    },
    title: { type: String },
    entry: { type: String, required: true },
    isFavorite: { type: Boolean, default: false }
});

module.exports = mongoose.model('Entry', entrySchema);
