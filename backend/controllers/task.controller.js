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

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found for this user" });
        }

        // Optional: Check if ALL users have paid, to update the main task status
        const allPaid = task.payments.every(p => p.hasPaid === true);
        if (allPaid) {
            const durationDays = Number(task.duration);
            if (!Number.isFinite(durationDays) || durationDays <= 0) {
                return res.status(400).json({ success: false, message: "Invalid task duration" });
            }
            task.status = 'in_progress';
            task.startedAt = new Date();
            task.endsAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
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

        const hydratedTasks = tasks.map((task) => {
            const taskObj = task.toObject();
            const shouldComputeEndDate =
                !taskObj.endsAt &&
                taskObj.startedAt &&
                Number(taskObj.duration) > 0 &&
                ["in_progress", "completed", "expired"].includes(taskObj.status);

            if (shouldComputeEndDate) {
                const startMs = new Date(taskObj.startedAt).getTime();
                if (!Number.isNaN(startMs)) {
                    taskObj.endsAt = new Date(
                        startMs + Number(taskObj.duration) * 24 * 60 * 60 * 1000
                    );
                }
            }

            return taskObj;
        });

        res.status(200).json({ success: true, tasks: hydratedTasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


