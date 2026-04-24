# 📘 Task Controller Documentation (`task.controller.js`)

This file is responsible for managing Group Tasks in **ShikshaConnect**. Its main purpose is to handle the creation of tasks, processing payments, daily contributions, tracking group streaks, and managing payouts when tasks expire.

---

## 🛠️ Helper Functions

These are smaller background functions used throughout the controller to perform calculations or checks.

1. **`getStartOfToday()`**
   - **What it does:** Grabs the exact start of the current day (12:00 AM).
   - **Why:** Used daily to know when to reset everyone's daily contribution status to `false`.

2. **`getTaskInvestmentAmount(task)`**
   - **What it does:** Calculates the financial value/investment amount of a task.
   - **Formula:** It multiplies the task's duration (in days) by `10`. (e.g., A 5-day task = 50 investment). If the duration is missing, it defaults to `25`.

3. **`getMaxStreakPercent(task)`**
   - **What it does:** Calculates how successful the group was mathematically.
   - **Formula:** `(Max Group Streak / Total Task Duration) * 100`. This gives the percentage of the task that was successfully completed without breaking the streak.

4. **`ensureDailyContributionCycle(task)`**
   - **What it does:** Acts like a midnight reset switch.
   - **Logic:** It checks what day it currently is. If the calendar day has rolled over (e.g., from Tuesday to Wednesday), it resets everyone's `hasContributed` checkmark to `false`.

---

## 🚀 API Endpoints

These are the main functions that route the data requested from your frontend.

### 1. `createGroupTask`
Creates a brand new task.
* **Flow:** 
  1. Grabs `title`, `description`, `duration`, and the invited friends (`participantIds`).
  2. Ensures the person *creating* the task is also added to the list of participants.
  3. Uses this entire list of participants to setup default empty records for `payments` (`hasPaid = false`) and `contribution` (`hasContributed = false`).
  4. Creates the task and sets its status to `waiting_for_payment`.

### 2. `payForTask`
Marks when a specific user has paid their share.
* **Flow:**
  1. Finds the specific user marking themselves as paid and sets their `hasPaid` to `true`.
  2. **The Magic Step:** It directly checks if *everyone* has paid. If all `hasPaid === true`, the task's status automatically flips to `in_progress`!
  3. It also marks the `startedAt` date as right now, and calculates the `endsAt` date based on the task's duration.

### 3. `contributeToTask`
This is called when a user presses the "Contribute" button for the day.
* **Flow:**
  1. First verifies the user is actually a participant.
  2. **Expiration Check:** It checks if the current time has passed the task's `endsAt` date. If it has, the task is marked as `expired`, and calculating the money/payout begins. (You collect a % of the investment based on how big your streak was).
  3. If still active, it triggers the "Midnight Reset" (`ensureDailyContributionCycle`) just in case a new day started.
  4. It marks that specific user's `hasContributed` to `true`.
  5. **Streak Check:** Once the user clicks contribute, it checks: *Did everyone else click contribute today too?* If yes, it increases the total Group Streak by 1! If this streak is the highest so far, it saves it to the database as the `maxStreak`.

### 4. `getUserTasks`
Fetches all tasks related to the currently logged in person to display on their dashboard.
* **Flow:**
  1. Grabs any task where the user is either the creator or a participant.
  2. Populates friend details (so you get usernames/emails instead of just unreadable IDs).
  3. **Auto-Maintenance Loop:** Before sending the data to the user, it loops through every task to fix any background issues:
      - Passes it through `ensureDailyContributionCycle` (resets daily checkboxes).
      - Double checks if the task secretly ran out of time while nobody was looking, and marks it `expired`.
      - **Streak Penalty:** Checks if it has been strictly over 24 hours since the last successful group contribution. If yes, the group lost their streak, so it resets the streak count to `0`.
  4. Sends the cleaned/updated tasks to your frontend. If the task is expired, it perfectly calculates exactly how much `collectableAmount` the users earned and passes it up.

---

## 🎯 Summary for Revision

* Tasks start as **`waiting_for_payment`**.
* Once everyone pays (`payForTask`), it becomes **`in_progress`**.
* Every day, everyone must click contribute (`contributeToTask`). If the *entire* group contributes, the **streak increases**. If you miss 24 hours (checked in `getUserTasks`), the **streak drops to 0**.
* Once the duration runs out, the task status becomes **`expired`** and users get a percentage of their initial investment back identically linked to how good their max streak was (calculated via `getMaxStreakPercent` & `getTaskInvestmentAmount`).
