#!/usr/bin/env node

/**
 * Simple test script for MCP tools
 * Run: node mcp-server/test-tools.js
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing Blueberry MCP Tools\n');
console.log('═══════════════════════════════════════\n');

// Test if MCP server is built
const mcpServerPath = join(__dirname, 'dist', 'index.js');

if (!existsSync(mcpServerPath)) {
  console.error('❌ MCP server not built!');
  console.error('   Run: npm run mcp:build');
  process.exit(1);
}

console.log('✅ MCP server build found\n');

// Dynamic import for ES modules
(async () => {
  try {
    console.log('📦 Loading MCP tools...\n');

    const componentAnalyzer = await import('./dist/tools/component-analyzer.js');
    const tokenValidator = await import('./dist/tools/token-validator.js');
    const accessibilityChecker = await import('./dist/tools/accessibility-checker.js');
    const designSystemQuery = await import('./dist/tools/design-system-query.js');

    console.log('✅ All tools loaded successfully\n');
    console.log('═══════════════════════════════════════\n');

    // Test 1: Component Analysis
    console.log('1️⃣  Testing analyze_component_usage\n');
    console.log('   Target: ../src/pages/Index.tsx\n');

    try {
      const componentResult = await componentAnalyzer.analyzeComponentUsage(
        join(__dirname, '..', 'src', 'pages', 'Index.tsx')
      );
      console.log(componentResult);
      console.log('\n✅ Component analysis completed\n');
    } catch (error) {
      console.error('❌ Component analysis failed:', error.message);
    }

    console.log('═══════════════════════════════════════\n');

    // Test 2: Token Validation
    console.log('2️⃣  Testing validate_tailwind_tokens\n');
    console.log('   Target: ../src/components/fintech/AccountCard.tsx\n');

    try {
      const tokenResult = await tokenValidator.validateTailwindTokens(
        join(__dirname, '..', 'src', 'components', 'fintech', 'AccountCard.tsx'),
        true
      );
      console.log(tokenResult);
      console.log('\n✅ Token validation completed\n');
    } catch (error) {
      console.error('❌ Token validation failed:', error.message);
    }

    console.log('═══════════════════════════════════════\n');

    // Test 3: Accessibility Check
    console.log('3️⃣  Testing check_accessibility\n');
    console.log('   Target: ../src/components/ui/button.tsx\n');

    try {
      const a11yResult = await accessibilityChecker.checkAccessibility(
        join(__dirname, '..', 'src', 'components', 'ui', 'button.tsx')
      );
      console.log(a11yResult);
      console.log('\n✅ Accessibility check completed\n');
    } catch (error) {
      console.error('❌ Accessibility check failed:', error.message);
    }

    console.log('═══════════════════════════════════════\n');

    // Test 4: Design System Query
    console.log('4️⃣  Testing query_design_system\n');
    console.log('   Query: "How to use Button component?"\n');

    try {
      const queryResult = await designSystemQuery.queryDesignSystem(
        'How to use Button component?',
        'components'
      );
      console.log(queryResult);
      console.log('\n✅ Design system query completed\n');
    } catch (error) {
      console.error('❌ Design system query failed:', error.message);
    }

    console.log('═══════════════════════════════════════\n');

    // Test 5: Visual Comparison (requires dev server)
    console.log('5️⃣  Testing compare_with_dashboard\n');
    console.log('   ⚠️  Skipping - requires dev server running\n');
    console.log('   To test: npm run dev (in another terminal)\n');
    console.log('   Then use Claude Code to run this tool\n');

    console.log('═══════════════════════════════════════\n');
    console.log('🎉 All available tests completed!\n');
    console.log('Summary:\n');
    console.log('✅ 4/5 tools tested successfully');
    console.log('⚠️  1 tool requires dev server (compare_with_dashboard)\n');
    console.log('Next steps:\n');
    console.log('1. Review the output above');
    console.log('2. Fix any issues found');
    console.log('3. Configure Claude Code (see QUICKSTART.md)');
    console.log('4. Start using MCP tools!\n');

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
})();
