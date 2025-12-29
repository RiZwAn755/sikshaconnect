import mongoose from 'mongoose';

const friendshipSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    connectedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Accepted', 'Requested', 'Rejected'],
      required: true,
    },
    streak: {
      count: {
        type: Number,
        default: 0,
      },
      lastUpdated: {
        type: Date,
      },
    },
    currentTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tasks',
      default: null,
    },
  },
  { timestamps: true }
);


friendshipSchema.index(
  { user1: 1, user2: 1 },
  { unique: true }
);

const Friendship = mongoose.model('Friendship', friendshipSchema);
export default Friendship;
