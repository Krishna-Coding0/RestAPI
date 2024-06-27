const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', TaskSchema);
