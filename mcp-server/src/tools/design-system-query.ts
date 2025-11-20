import { readFile, readdir } from "fs/promises";
import path from "path";
import { marked } from "marked";

const KNOWLEDGE_BASE_PATH = path.join(process.cwd(), "..", "mcp-knowledge-base");

interface KnowledgeDoc {
  path: string;
  category: string;
  title: string;
  content: string;
}

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
    return `Error querying design system: ${error instanceof Error ? error.message : String(error)}`;
  }
}

async function loadKnowledgeBase(category?: string): Promise<KnowledgeDoc[]> {
  const docs: KnowledgeDoc[] = [];
  const categories = category ? [category] : ["components", "tokens", "patterns", "reference", "rules"];

  for (const cat of categories) {
    const categoryPath = path.join(KNOWLEDGE_BASE_PATH, cat);
    try {
      await loadDocsFromDir(categoryPath, cat, docs);
    } catch (error) {
      // Directory might not exist, skip
    }
  }

  return docs;
}

async function loadDocsFromDir(
  dirPath: string,
  category: string,
  docs: KnowledgeDoc[]
): Promise<void> {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        await loadDocsFromDir(fullPath, category, docs);
      } else if (entry.name.endsWith(".md")) {
        const content = await readFile(fullPath, "utf-8");
        const title = entry.name.replace(".md", "");

        docs.push({
          path: fullPath,
          category,
          title,
          content,
        });
      }
    }
  } catch (error) {
    // Ignore errors for missing directories
  }
}

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

    if (score > 0) {
      results.push({ ...doc, score });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}

function formatQueryResponse(query: string, results: KnowledgeDoc[]): string {
  let response = `# Design System Query Results\n\n`;
  response += `**Query:** "${query}"\n`;
  response += `**Results found:** ${results.length}\n\n`;

  if (results.length === 0) {
    response += `No matching documentation found.\n\n`;
    response += `**Available categories:**\n`;
    response += `- components: UI and Fintech components\n`;
    response += `- tokens: Design tokens (colors, spacing, typography)\n`;
    response += `- patterns: Common UI patterns\n`;
    response += `- reference: Reference implementations\n`;
    response += `- rules: Design rules and validation guidelines\n`;
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

  return relevantSection || content.substring(0, 500) + "...\n";
}
