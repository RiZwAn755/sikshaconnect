import Tasks from "../models/task.model.js";

export const createGroupTask = async (req, res) => {
    try {
        const { title, description, duration, participantIds } = req.body;
        const creatorId = req.user._id; // Assuming you have authentication middleware

        // Make sure the creator is included in the participants list
        const allParticipants = [...new Set([...participantIds, creatorId.toString()])];

        // Prepare the payments array for all participants
        const paymentsArray = allParticipants.map(userId => ({
            user: userId,
            hasPaid: false
        }));

        const newTask = new Tasks({
            title,
            description,
            duration,
            createdBy: creatorId,
            participants: allParticipants,
            payments: paymentsArray,
            status: 'waiting_for_payment'
        });

        await newTask.save();

        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

 

export const payForTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user._id; 

        // Find the task and update the specific user's hasPaid status to true
        const task = await Tasks.findOneAndUpdate(
            { 
                _id: taskId, 
                "payments.user": userId 
            },
            { 
                $set: { "payments.$.hasPaid": true } 
            },
            { new: true }
        );

        // Optional: Check if ALL users have paid, to update the main task status
        const allPaid = task.payments.every(p => p.hasPaid === true);
        if (allPaid) {
            task.status = 'in_progress';
            task.startedAt = new Date();
            // set endsAt based on duration
            await task.save();
        }

        res.status(200).json({ success: true, task });
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
};


export const getUserTasks = async (req, res) => {
    try {
       
        const userId = req.user._id; 

        
        const tasks = await Tasks.find({
            $or: [
                { createdBy: userId },
                { participants: userId }
            ]
        })
        .populate("participants", "name username email") // Populate participant details
        .populate("createdBy", "name username"); // Populate owner details

        res.status(200).json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


