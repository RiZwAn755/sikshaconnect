import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    //  an array of participants
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    
    // Who created the task 
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

    // an array of objects
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
    },
    maxStreak: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const Tasks = mongoose.model("tasks", TaskSchema);
export default Tasks;
