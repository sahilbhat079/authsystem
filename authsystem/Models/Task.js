const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"],
    },
    description: {
        type: String,
        required: [true, "Task description is required"],
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
