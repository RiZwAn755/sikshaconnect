
import User from "../../models/user.model.js";
import "../../config/db.js";

(async () => {
  console.log("Fetching all indexes...");
  const indexes = await User.collection.getIndexes();
  console.log("Indexes found:", indexes);
  
  console.log("\nDropping all indexes...");
  await User.collection.dropIndexes();
  console.log("Done");

    const indexe = await User.collection.getIndexes();
  console.log("Indexes found:", indexe);
  process.exit();
})();
