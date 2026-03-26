import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    // Changed from friendshipId to an array of participants
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    
    // Who created the task (optional but helpful)
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    duration: {
        type: Number
    },
    
    status: {
        type: String,
        enum: ['waiting_for_payment', 'in_progress', 'completed', 'expired'],
        default: 'waiting_for_payment'
    },

    startedAt: Date,
    endsAt: Date,

    // Changed from user1Paid/user2Paid to an array of objects
    payments: [{
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        hasPaid: { 
            type: Boolean, 
            default: false 
        }
    }],

    contribution: [{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        hasContributed: {
            type: Boolean,
            default: false
        }
    }],

    contributionDay: {
        type: Date,
        default: null
    },

    streak: {
        count: {
            type: Number, 
            default: 0
        },
        lastUpdatedAt: {
            type: Date,
            default: null
        }
    }

}, { timestamps: true });

const Tasks = mongoose.model("tasks", TaskSchema);
export default Tasks;
