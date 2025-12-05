# External Repository Integration Guide

## 🔗 Connecting Blueberry MCP to Other Repos

Three ways to use your Blueberry Design System in external repos with deployment pipelines.

## 🎯 Integration Strategies

### Strategy 1: MCP Server Only (Validation)
**Best for:** Repos that want design system validation without using components

### Strategy 2: Component Library + MCP (Full Integration)
**Best for:** New projects using Blueberry components

### Strategy 3: MCP as CI Service (Centralized)
**Best for:** Multiple repos sharing one MCP server

## 📦 Strategy 1: MCP Server for Validation

### Step 1: Copy MCP Server to External Repo

```bash
# In external repo
cd /path/to/external-repo

# Copy MCP server
cp -r /path/to/blueberry/mcp-server ./mcp-server

# Copy knowledge base (or reference remote)
cp -r /path/to/blueberry/mcp-knowledge-base ./mcp-knowledge-base

# Copy configuration
cp /path/to/blueberry/mcp-config.json ./
```

### Step 2: Update MCP Configuration

Edit `mcp-config.json` for your external repo:

```json
{
  "mcpServers": {
    "blueberry-design-system": {
      "command": "node",
      "args": ["./mcp-server/dist/index.js"],
      "env": {
        "BASE_URL": "http://localhost:3000"
      }
    }
  },
  "designSystem": {
    "name": "Blueberry Design System",
    "version": "1.0.0",
    "referenceDashboard": "/",
    "knowledgeBasePath": "./mcp-knowledge-base"
  }
}
```

### Step 3: Add to Package.json

```json
{
  "scripts": {
    "mcp:build": "cd mcp-server && npm install && npm run build",
    "mcp:validate": "node scripts/mcp-validate.js",
    "precommit": "npm run mcp:validate"
  }
}
```

### Step 4: Add to CI Pipeline

#### GitHub Actions

```yaml
# .github/workflows/design-system-check.yml
name: Design System Validation

on:
  pull_request:
    paths:
      - 'src/**/*.tsx'
      - 'src/**/*.ts'
      - 'components/**/*.tsx'

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build MCP Server
        run: npm run mcp:build

      - name: Validate Components
        run: |
          node mcp-server/dist/validate-all.js > mcp-report.json

      - name: Upload Report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: mcp-validation-report
          path: mcp-report.json

      - name: Comment on PR
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('mcp-report.json', 'utf8'));
            const comment = `## 🔍 Design System Validation Failed\n\n${report.summary}`;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

#### GitLab CI

```yaml
# .gitlab-ci.yml
design-system-check:
  stage: test
  script:
    - npm ci
    - npm run mcp:build
    - node mcp-server/dist/validate-all.js
  artifacts:
    reports:
      junit: mcp-report.xml
    when: always
  only:
    changes:
      - src/**/*.tsx
      - src/**/*.ts
```

### Step 5: Create Validation Script

```typescript
// scripts/mcp-validate.js
import { analyzeComponentUsage } from '../mcp-server/dist/tools/component-analyzer.js';
import { validateTailwindTokens } from '../mcp-server/dist/tools/token-validator.js';
import { checkAccessibility } from '../mcp-server/dist/tools/accessibility-checker.js';
import { glob } from 'glob';
import fs from 'fs';

async function validateAll() {
  console.log('🔍 Running Design System Validation...\n');

  const files = glob.sync('src/**/*.{ts,tsx}');
  const results = [];
  let totalIssues = 0;

  for (const file of files) {
    console.log(`Checking ${file}...`);

    // Run all checks
    const componentAnalysis = await analyzeComponentUsage(file);
    const tokenValidation = await validateTailwindTokens(file);
    const a11yCheck = await checkAccessibility(file);

    const issues = countIssues(componentAnalysis, tokenValidation, a11yCheck);
    totalIssues += issues;

    results.push({
      file,
      issues,
      componentAnalysis,
      tokenValidation,
      a11yCheck
    });
  }

  // Generate report
  const report = {
    summary: `Checked ${files.length} files, found ${totalIssues} issues`,
    timestamp: new Date().toISOString(),
    results
  };

  fs.writeFileSync('mcp-report.json', JSON.stringify(report, null, 2));

  console.log(`\n${report.summary}`);

  // Exit with error if issues found
  if (totalIssues > 0) {
    console.error('❌ Design system validation failed!');
    process.exit(1);
  }

  console.log('✅ All checks passed!');
}

function countIssues(...reports) {
  let count = 0;
  for (const report of reports) {
    const matches = report.match(/❌/g);
    if (matches) count += matches.length;
  }
  return count;
}

validateAll();
```

## 📚 Strategy 2: Component Library + MCP

### Step 1: Build as Library

In Blueberry repo, build as distributable library:

```bash
# In blueberry
LIB_BUILD=1 npm run build

# This creates dist/blueberry-design-system.es.js
```

### Step 2: Option A - NPM Package (Private Registry)

```json
// blueberry/package.json
{
  "name": "@blueberry/design-system",
  "version": "1.0.0",
  "main": "./dist/blueberry-design-system.es.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "src/components"],
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

Publish:
```bash
npm publish
```

In external repo:
```bash
npm install @blueberry/design-system
```

### Step 2: Option B - Git Submodule

```bash
# In external repo
git submodule add https://github.com/your-org/blueberry.git design-system
```

### Step 2: Option C - Monorepo (Recommended)

```
my-org/
├── packages/
│   ├── blueberry-design-system/  # Your current repo
│   ├── marketing-site/           # External repo 1
│   ├── admin-dashboard/          # External repo 2
│   └── mobile-app/               # External repo 3
├── package.json                   # Root workspace
└── turbo.json                     # Turborepo config
```

Root `package.json`:
```json
{
  "name": "blueberry-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "mcp:validate": "turbo run mcp:validate"
  },
  "devDependencies": {
    "turbo": "latest"
  }
}
```

### Step 3: Use Components in External Repo

```tsx
// In external-repo/src/pages/Home.tsx
import { Button, Card } from '@blueberry/design-system';
import { useToast } from '@blueberry/design-system/hooks';

export function Home() {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => toast({ title: 'Hello!' })}>
          Click me
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Step 4: Validate Usage with MCP

External repo also has MCP server for validation:

```bash
# In external repo
npm run mcp:validate
```

## 🌐 Strategy 3: MCP as Centralized Service

### Deploy MCP Server as HTTP Service

Convert MCP server to HTTP API:

```typescript
// mcp-server/src/http-server.ts
import express from 'express';
import { analyzeComponentUsage } from './tools/component-analyzer.js';
import { validateTailwindTokens } from './tools/token-validator.js';

const app = express();
app.use(express.json());

app.post('/api/analyze-component', async (req, res) => {
  const { code, filename } = req.body;

  // Analyze code (passed as string)
  const result = await analyzeComponentUsage(code, filename);

  res.json({ result });
});

app.post('/api/validate-tokens', async (req, res) => {
  const { code, filename, strict } = req.body;

  const result = await validateTailwindTokens(code, filename, strict);

  res.json({ result });
});

app.listen(3001, () => {
  console.log('MCP HTTP API running on http://localhost:3001');
});
```

### Deploy with Docker

```dockerfile
# mcp-server/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY dist ./dist
COPY ../mcp-knowledge-base ./knowledge-base

EXPOSE 3001

CMD ["node", "dist/http-server.js"]
```

Deploy to your platform:

```bash
# Build and push
docker build -t registry.your-org.com/mcp-server:latest .
docker push registry.your-org.com/mcp-server:latest

# Deploy to Kubernetes/Cloud Run/Fly.io
```

### Use from External Repos

```typescript
// external-repo/scripts/validate-via-api.js
async function validateComponent(code, filename) {
  const response = await fetch('https://mcp.your-org.com/api/analyze-component', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MCP_API_KEY}`
    },
    body: JSON.stringify({ code, filename })
  });

  return response.json();
}
```

## 🚀 Deployment Pipeline Integration

### Example: Vercel + GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy with Design System Checks

on:
  push:
    branches: [main]

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      # Step 1: Design System Validation
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build MCP Server
        run: npm run mcp:build

      - name: Validate Design System
        run: npm run mcp:validate

      # Step 2: Visual Regression Tests
      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run Visual Tests
        run: npm run test:visual

      # Step 3: Build and Deploy
      - name: Build Application
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

      # Step 4: Post-Deploy Validation
      - name: Validate Production
        run: |
          DEPLOYED_URL=$(vercel inspect --token ${{ secrets.VERCEL_TOKEN }})
          BASE_URL=$DEPLOYED_URL npm run test:visual
```

### Example: Netlify

```toml
# netlify.toml
[build]
  command = "npm run mcp:validate && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-lighthouse"

[context.deploy-preview]
  command = "npm run mcp:validate && npm run build"
```

### Example: Railway/Fly.io

```yaml
# fly.toml
app = "external-app"

[build]
  [build.args]
    RUN_MCP_CHECKS = "true"

[deploy]
  release_command = "npm run mcp:validate"

[[services]]
  http_checks = []
  internal_port = 3000
  processes = ["app"]
  protocol = "tcp"
```

## 🔗 Multi-Repo Setup Example

### Scenario: 3 Apps Using Blueberry

```
Organization Repos:
├── blueberry-design-system (this repo)
├── marketing-website
├── admin-dashboard
└── customer-portal

All apps use Blueberry components and MCP validation
```

### Setup

#### 1. Design System Repo (blueberry)

```json
// package.json
{
  "name": "@blueberry/design-system",
  "version": "1.0.0",
  "scripts": {
    "build:lib": "LIB_BUILD=1 vite build",
    "publish:local": "npm run build:lib && npm pack"
  }
}
```

#### 2. Marketing Website

```bash
cd marketing-website

# Install design system
npm install @blueberry/design-system

# Copy MCP server
cp -r ../blueberry-design-system/mcp-server ./
npm run mcp:build

# Add to CI
cp ../blueberry-design-system/.github/workflows/design-system-check.yml \
   .github/workflows/
```

#### 3. Admin Dashboard

Same as marketing website.

#### 4. Customer Portal

Same as above.

### Shared MCP Configuration

Create shared config repository:

```
blueberry-mcp-config/
├── mcp-server/           # Centralized MCP server
├── knowledge-base/       # Shared docs
├── scripts/
│   ├── setup-repo.sh     # Auto-setup for new repos
│   └── sync-updates.sh   # Sync MCP updates
└── README.md
```

Auto-setup script:

```bash
#!/bin/bash
# scripts/setup-repo.sh

REPO_PATH=$1

echo "Setting up Blueberry MCP for $REPO_PATH..."

# Copy MCP server
cp -r mcp-server $REPO_PATH/
cp -r knowledge-base $REPO_PATH/mcp-knowledge-base

# Update package.json
cd $REPO_PATH
npm install --save-dev @modelcontextprotocol/sdk playwright

# Add scripts
npm pkg set scripts.mcp:build="cd mcp-server && npm install && npm run build"
npm pkg set scripts.mcp:validate="node mcp-server/dist/validate-all.js"

# Copy CI workflow
mkdir -p .github/workflows
cp ../blueberry-mcp-config/.github/workflows/design-system-check.yml \
   .github/workflows/

echo "✅ Setup complete! Run: npm run mcp:build"
```

## 📊 Centralized Monitoring

### MCP Dashboard (Optional)

Create central dashboard showing validation across all repos:

```typescript
// mcp-dashboard/src/pages/Dashboard.tsx
export function MCPDashboard() {
  const repos = useRepos(); // Fetch from API

  return (
    <div>
      <h1>Design System Health</h1>

      {repos.map(repo => (
        <Card key={repo.name}>
          <CardHeader>
            <CardTitle>{repo.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricRow label="Components" value={repo.componentCount} />
            <MetricRow label="Token Compliance" value={`${repo.tokenCompliance}%`} />
            <MetricRow label="Accessibility" value={`${repo.a11yScore}%`} />
            <MetricRow label="Visual Tests" status={repo.visualTestsStatus} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### GitHub App Integration

Create GitHub App that:
- Monitors PRs across all repos
- Runs MCP validation automatically
- Comments with results
- Links to Linear issues

## 🎯 Recommended Approach

For your use case, I recommend:

**Phase 1: Monorepo (if possible)**
- Move all projects into monorepo structure
- Shared MCP server
- Single source of truth
- Easy to keep in sync

**Phase 2: If Separate Repos**
- Publish @blueberry/design-system to npm
- Copy MCP server to each repo
- Centralized knowledge base (git submodule)
- GitHub Actions for validation

**Phase 3: Scale**
- Deploy MCP as HTTP service
- Build central dashboard
- GitHub App for automation
- Linear integration across all repos

Ready to implement? See `QUICKSTART.md` for step-by-step!
