import Tasks from "../models/task.model.js";

const getStartOfToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
};

const STREAK_WINDOW_MS = 24 * 60 * 60 * 1000; // 24h in ms

  // this is for calculate investment amount of task based on no. of days of tasks * 10 else bydefault = 25
const getTaskInvestmentAmount = (task) => {
    const durationDays = Number(task?.duration);
    return Number.isFinite(durationDays) && durationDays > 0 ? durationDays * 10 : 25;
};

const getMaxStreakPercent = (task) => {
    const maxStreakDays = Number(task?.maxStreak) || 0;
    const totalDays = Number(task?.duration);

    if (!Number.isFinite(totalDays) || totalDays <= 0) {
        return 0;
    }

    const rawPercent = (maxStreakDays / totalDays) * 100;
    return Math.max(0, Math.min(100, rawPercent));
};

const ensureDailyContributionCycle = (task) => {
    const todayStart = getStartOfToday();
    const currentContributionDay = task.contributionDay ? new Date(task.contributionDay) : null;
    const currentDayMs = currentContributionDay && !Number.isNaN(currentContributionDay.getTime())
        ? new Date(currentContributionDay.setHours(0, 0, 0, 0)).getTime()
        : null;

    if (currentDayMs !== todayStart.getTime()) {
        task.contribution = (task.contribution || []).map((entry) => ({
            user: entry.user,
            hasContributed: false,
        }));
        task.contributionDay = todayStart;
        return true;
    }

    if (!task.contributionDay) {
        task.contributionDay = todayStart;
        return true;
    }

    return false;
};

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

        const contributionArray = allParticipants.map(userId => ({
            user: userId,
            hasContributed: false
        }));

        const newTask = new Tasks({
            title,
            description,
            duration,
            createdBy: creatorId,
            participants: allParticipants,
            payments: paymentsArray,
            contribution: contributionArray,
            contributionDay: getStartOfToday(),
            status: 'waiting_for_payment'
        });

        await newTask.save();

        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const contributeToTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user._id;
        const task = await Tasks.findById(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        const isParticipant = (task.participants || []).some(
            (participantId) => String(participantId) === String(userId)
        );

        if (!isParticipant) {
            return res.status(403).json({ success: false, message: "Only participants can contribute" });
        }

        const now = new Date();
        const endTime = task.endsAt ? new Date(task.endsAt).getTime() : NaN;
        const hasEnded = !Number.isNaN(endTime) && endTime < now.getTime();

        if (hasEnded) {
            if (task.status !== "expired") {
                task.status = "expired";
                await task.save();
            }

            const maxStreakPercent = getMaxStreakPercent(task);
            const investedAmount = getTaskInvestmentAmount(task);
            const collectableAmount = (investedAmount * maxStreakPercent) / 100;

            return res.status(400).json({
                success: false,
                message: `Task expired. You can collect ${maxStreakPercent}% of invested amount based on max streak.`,
                task,
                payout: {
                    maxStreakDays: Number(task.maxStreak) || 0,
                    maxStreakPercent,
                    investedAmount,
                    collectableAmount,
                },
            });
        }

        if (!Array.isArray(task.contribution)) {
            task.contribution = [];
        }

        // Backfill missing contribution entries for old tasks.
        const existingContributionMap = new Map(
            task.contribution.map((entry) => [String(entry.user), entry.hasContributed === true])
        );

        const normalizedContribution = task.participants.map((participantId) => ({
            user: participantId,
            hasContributed: existingContributionMap.get(String(participantId)) || false,
        }));

        task.contribution = normalizedContribution;
        ensureDailyContributionCycle(task);

        const myContribution = task.contribution.find(
            (entry) => String(entry.user) === String(userId)
        );

        if (!myContribution) {
            return res.status(400).json({ success: false, message: "Unable to set contribution for this user" });
        }

        myContribution.hasContributed = true;
        
        await task.save();
         
        const allContributed = task.contribution.every(c => c.hasContributed === true);
        if (allContributed && task.status === 'in_progress') {
            const lastUpdatedAt = task.streak?.lastUpdatedAt ? new Date(task.streak.lastUpdatedAt) : null;
            const within24Hours =
                lastUpdatedAt &&
                !Number.isNaN(lastUpdatedAt.getTime()) &&
            (now.getTime() - lastUpdatedAt.getTime()) < STREAK_WINDOW_MS;

            if (!task.streak) {
                task.streak = { count: 0, lastUpdatedAt: null };
            }

            if (within24Hours) {
                task.streak.count += 1;
            } else if (!lastUpdatedAt) {
                task.streak.count = 1;
            } else {
                task.streak.count = 0;
            }

            const currentMaxStreak = Number(task.maxStreak) || 0;
            if (task.streak.count > currentMaxStreak) {
                task.maxStreak = task.streak.count;
            }

            task.streak.lastUpdatedAt = now;
            await task.save();
        }

        res.status(200).json({ success: true, task });
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

        const now = new Date();

        for (const task of tasks) {
            let shouldSave = ensureDailyContributionCycle(task);

            const endTime = task.endsAt ? new Date(task.endsAt).getTime() : NaN;
            const hasEnded = !Number.isNaN(endTime) && endTime < now.getTime();

            if (hasEnded && task.status !== "expired") {
                task.status = "expired";
                shouldSave = true;
            }

            const streakLastUpdatedAt = task.streak?.lastUpdatedAt
                ? new Date(task.streak.lastUpdatedAt)
                : null;
            const isStreakOverdue =
                task.status === "in_progress" &&
                streakLastUpdatedAt &&
                !Number.isNaN(streakLastUpdatedAt.getTime()) &&
                (now.getTime() - streakLastUpdatedAt.getTime()) >= STREAK_WINDOW_MS;

            if (isStreakOverdue && (Number(task.streak?.count) || 0) !== 0) {
                task.streak.count = 0;
                shouldSave = true;
            }

            if (shouldSave) {
                await task.save();
            }
        }

        const hydratedTasks = tasks.map((task) => {
            const taskObj = task.toObject();
            const investedAmount = getTaskInvestmentAmount(taskObj);
            const maxStreakPercent = getMaxStreakPercent(taskObj);
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

            if (taskObj.status === "expired") {
                taskObj.expiredMeta = {
                    maxStreakDays: Number(taskObj.maxStreak) || 0,
                    maxStreakPercent,
                    investedAmount,
                    collectableAmount: (investedAmount * maxStreakPercent) / 100,
                    message: `Task expired. You can collect ${maxStreakPercent}% of invested amount based on max streak.`,
                };
            }

            return taskObj;
        });

        res.status(200).json({ success: true, tasks: hydratedTasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


