/**
 * Browser-compatible design system query service
 * Based on MCP server's query_design_system tool
 */

interface KnowledgeDoc {
  path: string;
  category: string;
  title: string;
  content: string;
}

// Pre-loaded knowledge base content
// In production, these would be loaded via fetch or import.meta.glob
const KNOWLEDGE_BASE: Record<string, { category: string; title: string; content: string }> = {};

/**
 * Load knowledge base from markdown files
 * This is a simplified version that works in the browser
 */
async function loadKnowledgeBase(category?: string): Promise<KnowledgeDoc[]> {
  const docs: KnowledgeDoc[] = [];
  const categories = category ? [category] : ["components", "tokens", "patterns", "reference", "rules"];

  // Try to load markdown files from public directory
  // In a real implementation, these would be pre-loaded or fetched
  for (const cat of categories) {
    try {
      // For now, we'll use a hardcoded knowledge base
      // In production, you could:
      // 1. Copy mcp-knowledge-base to public/ and fetch via HTTP
      // 2. Use Vite's import.meta.glob to import markdown files
      // 3. Create an API endpoint that serves the knowledge base
      
      // Placeholder: We'll implement a fetch-based approach
      const categoryDocs = await loadCategoryDocs(cat);
      docs.push(...categoryDocs);
    } catch (error) {
      console.warn(`Failed to load category ${cat}:`, error);
    }
  }

  return docs;
}

/**
 * Load docs from a category via fetch
 * Assumes mcp-knowledge-base is copied to public/mcp-knowledge-base/
 */
async function loadCategoryDocs(category: string): Promise<KnowledgeDoc[]> {
  const docs: KnowledgeDoc[] = [];
  
  // List of known files (matches actual structure in public/mcp-knowledge-base/)
  const knownFiles: Record<string, string[]> = {
    components: ['ui/button.md', 'ui/card.md'],
    tokens: ['colors.md', 'spacing.md', 'typography.md'],
    patterns: ['dashboard-layout.md'],
    reference: ['dashboard-spec.md'],
    rules: ['button-hierarchy.md', 'color-token-usage.md', 'no-emojis.md', 'spacing-consistency.md', 'typography-consistency.md'],
  };

  const files = knownFiles[category] || [];
  
  for (const file of files) {
    try {
      const response = await fetch(`/mcp-knowledge-base/${category}/${file}`);
      if (response.ok) {
        const content = await response.text();
        const title = file.replace('.md', '').split('/').pop() || file;
        docs.push({
          path: file,
          category,
          title,
          content,
        });
      }
    } catch (error) {
      // File might not exist, skip
      console.debug(`Could not load ${category}/${file}`);
    }
  }

  return docs;
}

/**
 * Search documents for relevant content
 */
function searchDocs(docs: KnowledgeDoc[], query: string): KnowledgeDoc[] {
  const queryLower = query.toLowerCase();
  const results: Array<KnowledgeDoc & { score: number }> = [];

  for (const doc of docs) {
    let score = 0;

    // Title match (highest priority)
    if (doc.title.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // Content match
    const contentLower = doc.content.toLowerCase();
    const matches = (contentLower.match(new RegExp(queryLower, "g")) || []).length;
    score += matches;

    // Category match
    if (doc.category.toLowerCase().includes(queryLower)) {
      score += 5;
    }

    // Check for word matches
    const queryWords = queryLower.split(/\s+/);
    queryWords.forEach(word => {
      if (word.length > 2) {
        if (doc.title.toLowerCase().includes(word)) score += 3;
        if (doc.content.toLowerCase().includes(word)) score += 1;
      }
    });

    if (score > 0) {
      results.push({ ...doc, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}

/**
 * Format query response
 */
function formatQueryResponse(query: string, results: KnowledgeDoc[]): string {
  let response = `# Design System Information\n\n`;
  response += `**Fråga:** "${query}"\n`;
  response += `**Resultat:** ${results.length} relevanta dokument hittades\n\n`;

  if (results.length === 0) {
    response += `Inga matchande dokument hittades.\n\n`;
    response += `**Tillgängliga kategorier:**\n`;
    response += `- components: UI och Fintech-komponenter\n`;
    response += `- tokens: Design tokens (färger, spacing, typografi)\n`;
    response += `- patterns: Vanliga UI-mönster\n`;
    response += `- reference: Referensimplementationer\n`;
    response += `- rules: Designregler och valideringsriktlinjer\n`;
    return response;
  }

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    response += `## ${i + 1}. ${result.title} (${result.category})\n\n`;

    // Extract relevant sections
    const sections = extractRelevantSections(result.content, query);
    response += sections;
    response += `\n---\n\n`;
  }

  return response;
}

/**
 * Extract relevant sections from content
 */
function extractRelevantSections(content: string, query: string): string {
  const lines = content.split("\n");
  const queryLower = query.toLowerCase();
  let relevantSection = "";
  let inRelevantSection = false;
  let currentHeading = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track headings
    if (line.startsWith("#")) {
      currentHeading = line;
      inRelevantSection = line.toLowerCase().includes(queryLower);
    }

    // Check if line contains query
    if (line.toLowerCase().includes(queryLower)) {
      if (!inRelevantSection) {
        relevantSection += currentHeading + "\n";
        inRelevantSection = true;
      }
      relevantSection += line + "\n";

      // Include context (next 3 lines)
      for (let j = 1; j <= 3 && i + j < lines.length; j++) {
        const nextLine = lines[i + j];
        if (!nextLine.startsWith("#")) {
          relevantSection += nextLine + "\n";
        } else {
          break;
        }
      }
    } else if (inRelevantSection && !line.startsWith("#")) {
      relevantSection += line + "\n";
    } else if (line.startsWith("#")) {
      inRelevantSection = false;
    }
  }

  // If no relevant section found, return first 500 chars
  return relevantSection || content.substring(0, 500) + "...\n";
}

/**
 * Query the design system knowledge base
 * Browser-compatible version of MCP's query_design_system tool
 */
export async function queryDesignSystem(
  query: string,
  category?: string
): Promise<string> {
  try {
    // Load knowledge base
    const docs = await loadKnowledgeBase(category);

    // Search for relevant docs
    const results = searchDocs(docs, query);

    // Format response
    return formatQueryResponse(query, results);
  } catch (error) {
    return `Fel vid sökning i design system: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Check if a query is about the design system
 */
export function isDesignSystemQuery(message: string): boolean {
  const designSystemKeywords = [
    'design system',
    'komponent',
    'component',
    'button',
    'card',
    'token',
    'färg',
    'color',
    'spacing',
    'typografi',
    'typography',
    'pattern',
    'mönster',
    'radix',
    'tailwind',
    'accessibility',
    'tillgänglighet',
    'aria',
    'variant',
    'theme',
    'tema',
    'nielsen',
    'norman',
    'donald norman',
    'jakob nielsen',
    'usability',
    'användbarhet',
    'designer',
    'designers',
    'design thinking',
    'affordance',
    'signifier',
    'mental model',
    'mentala modell',
    'user-centered',
    'humanity-centered',
    'activity-centered',
    'system-centered',
  ];

  const messageLower = message.toLowerCase();
  return designSystemKeywords.some(keyword => messageLower.includes(keyword));
}

