
import mongoose from 'mongoose';

const friendshipSchema = new mongoose.Schema({

    User1 :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    User2 :{
        type :mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    connectedAt : {
        type:Date
    },
    status:{
        type:String,
        enum:['Accepted', 'Pending', 'Rejected'],
        required:true,
    },
    streak:{
        type:Number,
        default:0,
        lastUpdated:Date
    },
    currentTask:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Task',
        default:null,
    }

}, {timestamps: true});

const Friendship = mongoose.model('Friendship', friendshipSchema);
Friendship.diffIndexes({User1: 1, User2: 1}, {unique: true});
export default Friendship;
