#!/usr/bin/env node

/**
 * Design System Auto-Fix Script
 * 
 * Automatically fixes common design system violations:
 * - Hardcoded colors → design tokens
 * - Arbitrary spacing → standard spacing scale
 * - Arbitrary typography → standard typography scale
 * - Button hierarchy violations
 */

import { readdir, stat } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Import fixer function
const { fixDesignViolations } = await import(
  path.join(projectRoot, "mcp-server/dist/tools/design-fixer.js")
);

/**
 * Recursively find all React component files
 */
async function findComponentFiles(dir = "src", baseDir = projectRoot) {
  const files = [];
  const fullPath = path.join(baseDir, dir);
  
  try {
    const entries = await readdir(fullPath);
    
    for (const entry of entries) {
      const entryPath = path.join(fullPath, entry);
      const relativePath = path.join(dir, entry);
      const stats = await stat(entryPath);
      
      // Skip ignored directories
      if (stats.isDirectory()) {
        if (
          entry === "node_modules" ||
          entry === "dist" ||
          entry === "coverage" ||
          entry === "storybook-static" ||
          entry === "stories"
        ) {
          continue;
        }
        // Recursively search subdirectories
        const subFiles = await findComponentFiles(relativePath, baseDir);
        files.push(...subFiles);
      } else if (stats.isFile()) {
        // Check if it's a React component file
        if (
          (entry.endsWith(".tsx") || entry.endsWith(".jsx")) &&
          !entry.endsWith(".test.tsx") &&
          !entry.endsWith(".spec.tsx") &&
          !entry.endsWith(".stories.tsx")
        ) {
          files.push(relativePath);
        }
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read, skip it
    if (error.code !== "ENOENT") {
      console.warn(`Warning: Could not read directory ${dir}:`, error.message);
    }
  }
  
  return files;
}

/**
 * Main fix function
 */
async function fixDesignSystem(dryRun = false) {
  console.log(`🔧 ${dryRun ? "Checking" : "Fixing"} design system violations...\n`);

  const files = await findComponentFiles();
  console.log(`Found ${files.length} component file(s)\n`);

  let totalFixes = 0;
  let filesFixed = 0;

  for (const file of files) {
    const fullPath = path.join(projectRoot, file);
    try {
      const result = await fixDesignViolations(fullPath, dryRun);
      
      if (result.includes("Fixes applied:")) {
        const match = result.match(/Fixes applied:\s*(\d+)/);
        if (match) {
          const count = parseInt(match[1]);
          if (count > 0) {
            totalFixes += count;
            filesFixed++;
            console.log(`✅ ${file}: ${count} fix(es) ${dryRun ? "would be" : ""} applied`);
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Warning: Could not process ${file}:`, error.message);
    }
  }

  console.log("\n" + "=".repeat(80));
  if (dryRun) {
    console.log(`Found ${totalFixes} potential fix(es) across ${filesFixed} file(s)`);
    console.log("Run without --dry-run to apply fixes");
  } else {
    console.log(`Applied ${totalFixes} fix(es) across ${filesFixed} file(s)`);
  }
  console.log("=".repeat(80) + "\n");
}

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run") || args.includes("-d");

fixDesignSystem(dryRun).catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

