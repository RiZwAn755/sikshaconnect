import mongoose from "mongoose";
import User from "../../models/user.model.js";  // adjust path if needed
import "../../config/db.js";  // ensure DB connection is established

// Helper to measure execution time
async function benchmark(label, fn) {
  const start = performance.now();
  await fn();
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(2)} ms`);
}

async function runBenchmark() {
  // STEP 1: DROP INDEX IF EXISTS (only for testing)
  try {
    await User.collection.dropIndexes();
    console.log("Existing indexes dropped");
  } catch (err) {
    console.log("No indexes to drop or error dropping indexes");
  }

  // STEP 2: RUN QUERY WITHOUT INDEX
  console.log("\nRunning search WITHOUT index...");
  await benchmark("Without Index", () =>
    User.find({ email: "abc@abc.com" })
  );

  // STEP 3: CREATE INDEX
  console.log("\nCreating index { email: 1 }...");
  await User.collection.createIndex({ email: 1 });
  console.log("Index created");

  // STEP 4: RUN QUERY WITH INDEX
  console.log("\nRunning search WITH index...");
  await benchmark("With Index", () =>
    User.find({ email: "abc@abc.com" })
  );

  console.log("\nBenchmark complete!");
  process.exit();
}

runBenchmark().catch((err) => {
  console.error(err);
  process.exit(1);
});
