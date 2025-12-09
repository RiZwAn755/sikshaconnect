import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({

    friendshipId:{
        type: mongoose.Types.ObjectId,
        ref : 'Friendship',
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    duration:{
        type:Number
    },
    status:{
        type:String,
        enum:['waiting_for_payment', 'in_progress', 'completed', 'expired'],
        default:'waiting_for_payment'
    },

    startedAT: Date,
    endsAt:Date,

     userPayments: {
    user1Paid: { type: Boolean, default: false },
    user2Paid: { type: Boolean, default: false }
  },

}, {timestamps:true})

const Tasks = mongoose.model("tasks", TaskSchema);
export default Tasks;