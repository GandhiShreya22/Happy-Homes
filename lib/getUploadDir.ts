import path from "path";
import fs from "fs";

export function getUploadDir() {
  // Detect if running from .next build folder
  let projectRoot = process.cwd();

  if (projectRoot.includes(".next")) {
    // Go up until we exit the .next folder
    while (projectRoot.includes(".next")) {
      projectRoot = path.join(projectRoot, "..");
    }
  }

  const uploadDir = path.join(projectRoot, "public", "uploads");

  // Ensure folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return uploadDir;
}
