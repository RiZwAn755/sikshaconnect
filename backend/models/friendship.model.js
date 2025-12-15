
import mongoose from 'mongoose';

const friendshipSchema = new mongoose.Schema({

    user1 :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    user2 :{
        type :mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    connectedAt : {
        type:Date
    },
    status:{
        type:String,
        enum:["Accepted", "Requested", "Rejected"],
        required:true,
    },
    streak:{
        type:Number,
        default:0,
        lastUpdated:Date
    },
    currentTask:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'tasks',
        default:null,
    }

}, {timestamps: true});

const Friendship = mongoose.model('Friendship', friendshipSchema);
Friendship.diffIndexes({User1: 1, User2: 1}, {unique: true});
export default Friendship;
