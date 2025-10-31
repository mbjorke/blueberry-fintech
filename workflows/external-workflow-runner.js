#!/usr/bin/env node

/**
 * External Workflow Runner
 * Allows external projects to run workflows from the Blueberry Design System monorepo
 *
 * Usage:
 *   npx @blueberry/design-system workflow:design-review
 *   npx @blueberry/design-system workflow:code-review
 *   npx @blueberry/design-system workflow:security-review
 *   npx @blueberry/design-system workflow:all
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to find the monorepo workflows directory
function findWorkflowsDir() {
  // First try relative to this script
  let workflowsDir = path.join(__dirname, '..', '..', 'workflows');

  if (fs.existsSync(workflowsDir)) {
    return workflowsDir;
  }

  // If not found, try from node_modules (when installed)
  const nodeModulesWorkflows = path.join(__dirname, '..', '..', '..', '..', 'workflows');
  if (fs.existsSync(nodeModulesWorkflows)) {
    return nodeModulesWorkflows;
  }

  // Try to find the monorepo root by looking for the monorepo package.json
  let currentDir = __dirname;
  for (let i = 0; i < 10; i++) {
    currentDir = path.dirname(currentDir);
    const monorepoPkg = path.join(currentDir, 'package.json');
    if (fs.existsSync(monorepoPkg)) {
      const pkg = JSON.parse(fs.readFileSync(monorepoPkg, 'utf8'));
      if (pkg.name === 'blueberry-monorepo') {
        return path.join(currentDir, 'workflows');
      }
    }
  }

  return null;
}

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log(`
🚀 Blueberry Design System - External Workflow Runner
====================================================

Available commands:
  design-review    Run design review workflow
  code-review      Run code review workflow
  security-review  Run security review workflow
  all             Run all workflows
  help            Show this help message

Usage:
  npx @blueberry/design-system workflow:design-review
  npx @blueberry/design-system workflow:code-review
  npx @blueberry/design-system workflow:all
`);
  process.exit(0);
}

// Find the workflows directory
const workflowsDir = findWorkflowsDir();

if (!workflowsDir) {
  console.error(`❌ Could not find workflows directory. Make sure you're running from within the blueberry-monorepo or have it accessible.`);
  console.error(`Current directory: ${process.cwd()}`);
  console.error(`Script location: ${__dirname}`);
  process.exit(1);
}

const workflows = {
  'design-review': 'design-review/runner.js',
  'code-review': 'code-review/runner.js',
  'security-review': 'security-review/runner.js',
  'all': 'all'
};

if (!workflows[command]) {
  console.error(`❌ Unknown workflow: ${command}`);
  console.log('Run with no arguments to see available commands');
  process.exit(1);
}

try {
  if (command === 'all') {
    console.log('🚀 Running all workflows...\n');

    console.log('📋 Running design review...');
    execSync(`node ${path.join(workflowsDir, 'design-review/runner.js')}`, { stdio: 'inherit' });

    console.log('\n📋 Running code review...');
    execSync(`node ${path.join(workflowsDir, 'code-review/runner.js')}`, { stdio: 'inherit' });

    console.log('\n📋 Running security review...');
    execSync(`node ${path.join(workflowsDir, 'security-review/runner.js')}`, { stdio: 'inherit' });

    console.log('\n✅ All workflows completed!');
  } else {
    const scriptPath = path.join(workflowsDir, workflows[command]);
    console.log(`🚀 Running ${command} workflow...\n`);
    execSync(`node ${scriptPath}`, { stdio: 'inherit' });
    console.log(`\n✅ ${command} workflow completed!`);
  }
} catch (error) {
  console.error(`❌ Workflow failed:`, error.message);
  process.exit(1);
}
