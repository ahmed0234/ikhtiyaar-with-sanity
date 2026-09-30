import { execSync } from "node:child_process";

console.log("Applying database schema to Neon PostgreSQL...");
try {
  execSync("drizzle-kit push", { stdio: "inherit" });
  console.log("Database schema successfully applied to Neon PostgreSQL.");
} catch (error) {
  console.error("Migration failed:", error);
  process.exit(1);
}
