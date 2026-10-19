import { VectorStore } from './vector-store.ts';
import { simpleEmbedding } from './math.ts';
import type { SearchResult } from './types.ts';

export class RagAgent {
  readonly store = new VectorStore();

  addDocument(docId: string, text: string): void {
    // Divisão simples por parágrafos/frases
    const parts = text.split(/(?<=[.?!])\s+/).filter(Boolean);
    parts.forEach((p, idx) => {
      this.store.insert({
        id: `${docId}_chunk_${idx}`,
        docId,
        text: p.trim(),
        embedding: simpleEmbedding(p.trim())
      });
    });
  }

  retrieveContext(query: string, topK = 2): SearchResult[] {
    const queryVec = simpleEmbedding(query);
    return this.store.query(queryVec, topK);
  }

  synthesizePrompt(query: string, topK = 2): string {
    const matches = this.retrieveContext(query, topK);
    const context = matches.map(m => `- ${m.chunk.text}`).join('\n');
    return `Context:\n${context}\n\nQuestion: ${query}\nAnswer:`;
  }
}
