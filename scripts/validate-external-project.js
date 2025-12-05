#!/usr/bin/env node

/**
 * Design System Validation Script for External Projects
 * 
 * Usage: node scripts/validate-external-project.js <path-to-project>
 * Example: node scripts/validate-external-project.js ../uxdb-main
 */

import { readdir, stat, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const blueberryRoot = path.resolve(__dirname, "..");

// Get project path from command line
const externalProjectPath = process.argv[2];

if (!externalProjectPath) {
  console.error("❌ Error: Please provide a project path");
  console.error("Usage: node scripts/validate-external-project.js <path-to-project>");
  console.error("Example: node scripts/validate-external-project.js ../uxdb-main");
  process.exit(1);
}

const projectRoot = path.resolve(externalProjectPath);

// Import validation functions from blueberry MCP server
const { analyzeComponentUsage } = await import(
  path.join(blueberryRoot, "mcp-server/dist/tools/component-analyzer.js")
);
const { validateTailwindTokens } = await import(
  path.join(blueberryRoot, "mcp-server/dist/tools/token-validator.js")
);

const DESIGN_SYSTEM_RULES = {
  buttonHierarchy: true,
  colorTokens: true,
  spacingConsistency: true,
  typographyConsistency: true,
};

/**
 * Recursively find all React component files in external project
 */
async function findComponentFiles(dir = ".", baseDir = projectRoot) {
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
          entry === "build" ||
          entry === "coverage" ||
          entry === ".next" ||
          entry === ".git" ||
          entry === "storybook-static" ||
          entry === "stories" ||
          entry.startsWith(".")
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
          !entry.endsWith(".stories.tsx") &&
          !entry.endsWith(".test.jsx") &&
          !entry.endsWith(".spec.jsx")
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
 * Validate a single file
 */
async function validateFile(filePath) {
  const fullPath = path.join(projectRoot, filePath);
  const results = {
    file: filePath,
    errors: [],
    warnings: [],
    passed: true,
  };

  try {
    // Component usage analysis (includes button hierarchy)
    if (DESIGN_SYSTEM_RULES.buttonHierarchy) {
      try {
        const componentReport = await analyzeComponentUsage(fullPath);
        if (componentReport.includes("❌")) {
          results.errors.push("Component usage violations found");
          results.passed = false;
        }
        if (componentReport.includes("⚠️")) {
          results.warnings.push("Component usage warnings");
        }
      } catch (error) {
        // File might not be a React component, skip
        if (!error.message.includes("ENOENT")) {
          results.warnings.push(`Component analysis: ${error.message}`);
        }
      }
    }

    // Token validation (includes colors, spacing, typography)
    if (
      DESIGN_SYSTEM_RULES.colorTokens ||
      DESIGN_SYSTEM_RULES.spacingConsistency ||
      DESIGN_SYSTEM_RULES.typographyConsistency
    ) {
      try {
        const tokenReport = await validateTailwindTokens(fullPath, true);
        if (tokenReport.includes("Errors:")) {
          const errorMatch = tokenReport.match(/Errors:\s*(\d+)/);
          if (errorMatch && parseInt(errorMatch[1]) > 0) {
            results.errors.push(`Token validation errors: ${errorMatch[1]}`);
            results.passed = false;
          }
        }
        if (tokenReport.includes("Warnings:")) {
          const warningMatch = tokenReport.match(/Warnings:\s*(\d+)/);
          if (warningMatch && parseInt(warningMatch[1]) > 0) {
            results.warnings.push(`Token validation warnings: ${warningMatch[1]}`);
          }
        }
      } catch (error) {
        // File might not exist or have issues, skip
        if (!error.message.includes("ENOENT")) {
          results.warnings.push(`Token validation: ${error.message}`);
        }
      }
    }
  } catch (error) {
    results.errors.push(`Validation error: ${error.message}`);
    results.passed = false;
  }

  return results;
}

/**
 * Main validation function
 */
async function validateExternalProject() {
  console.log(`🔍 Validating design system compliance for: ${projectRoot}\n`);

  // Check if project exists
  try {
    await stat(projectRoot);
  } catch (error) {
    console.error(`❌ Error: Project path does not exist: ${projectRoot}`);
    process.exit(1);
  }

  const files = await findComponentFiles();
  console.log(`Found ${files.length} component file(s) to validate\n`);

  if (files.length === 0) {
    console.log("⚠️  No React component files found in this project.");
    console.log("   Make sure the project contains .tsx or .jsx files.\n");
    process.exit(0);
  }

  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files) {
    const result = await validateFile(file);
    results.push(result);
    
    if (result.errors.length > 0) {
      totalErrors += result.errors.length;
    }
    if (result.warnings.length > 0) {
      totalWarnings += result.warnings.length;
    }
  }

  // Print results
  console.log("\n" + "=".repeat(80));
  console.log("VALIDATION RESULTS");
  console.log("=".repeat(80) + "\n");

  const failedFiles = results.filter(r => !r.passed);
  const passedFiles = results.filter(r => r.passed);

  if (failedFiles.length > 0) {
    console.log(`❌ ${failedFiles.length} file(s) with violations:\n`);
    for (const result of failedFiles) {
      console.log(`  ${result.file}`);
      for (const error of result.errors) {
        console.log(`    ❌ ${error}`);
      }
      for (const warning of result.warnings) {
        console.log(`    ⚠️  ${warning}`);
      }
      console.log();
    }
  }

  if (passedFiles.length > 0) {
    console.log(`✅ ${passedFiles.length} file(s) passed validation\n`);
  }

  console.log("=".repeat(80));
  console.log(`Total Errors: ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  console.log("=".repeat(80) + "\n");

  if (totalErrors > 0) {
    console.log("💡 Tip: Review violations and update code to follow design system guidelines\n");
    process.exit(1);
  }

  console.log("✅ All files passed design system validation!\n");
  process.exit(0);
}

// Run validation
validateExternalProject().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

