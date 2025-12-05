import { GoogleGenAI } from "@google/genai";
import { FULL_LETTER_CONTEXT } from '@/constants/portfolio';
import { findRelevantArticles } from '@/knowledge-base/articles';
import { queryDesignSystem, isDesignSystemQuery } from './designSystemQuery';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (message: string, history: {role: 'user' | 'model', text: string}[] = []) => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set VITE_GEMINI_API_KEY environment variable.");
  }

  try {
    // We use a simple generateContent approach with system instructions injected into the context 
    // because we want a very specific persona for each interaction.
    // For a persistent chat session, ai.chats.create is great, but here we want strict adherence 
    // to the persona defined in FULL_LETTER_CONTEXT for every turn to prevent drift.
    
    // Simple RAG: Find relevant articles from knowledge base
    const relevantArticles = findRelevantArticles(message, 2);
    let knowledgeBaseContext = '';
    
    if (relevantArticles.length > 0) {
      knowledgeBaseContext = '\n\nRELEVANT KUNSKAPSBAS (Artiklar & LinkedIn):\n';
      relevantArticles.forEach(article => {
        knowledgeBaseContext += `\n--- ${article.title} (${article.date}) ---\n`;
        knowledgeBaseContext += `${article.content}\n`;
        knowledgeBaseContext += `Länk: ${article.url}\n`;
      });
    }

    // Check if this is a design system query and add design system context
    let designSystemContext = '';
    if (isDesignSystemQuery(message)) {
      try {
        const designSystemInfo = await queryDesignSystem(message);
        designSystemContext = `\n\nDESIGN SYSTEM INFORMATION:\n${designSystemInfo}\n`;
      } catch (error) {
        console.warn('Failed to query design system:', error);
        // Continue without design system context
      }
    }
    
    // Convert history to string context loosely
    const conversationContext = history.map(h => `${h.role === 'user' ? 'Fråga' : 'Svar'}: ${h.text}`).join('\n');
    
    const prompt = `
      ${FULL_LETTER_CONTEXT}
      ${knowledgeBaseContext}
      ${designSystemContext}

      TIDIGARE KONVERSATION:
      ${conversationContext}

      NY FRÅGA:
      ${message}

      Ditt svar (Håll det kort, max 3 meningar om möjligt, och skriv som jag, Marcus):
      ${relevantArticles.length > 0 ? 'VIKTIGT: Om det finns relevant information i kunskapsbasen ovan (artiklar om Nielsen, Norman, Design Thinking, etc.), använd den informationen i ditt svar. Referera specifikt till den informationen när den är relevant för frågan.' : ''}
      ${designSystemContext ? 'Om frågan handlar om design system, komponenter eller UI, använd informationen från design system-kunskapsbasen ovan.' : ''}
      Om frågan handlar om Donald Norman, Jakob Nielsen, Design Thinking, eller relaterade ämnen, använd informationen från kunskapsbasen ovan. Var specifik och referera till deras teorier och principer när det är relevant.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

