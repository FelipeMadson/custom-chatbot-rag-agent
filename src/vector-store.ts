import { cosineSimilarity } from './math.ts';
import type { DocumentChunk, SearchResult } from './types.ts';

export class VectorStore {
  private chunks: DocumentChunk[] = [];

  insert(chunk: DocumentChunk): void {
    this.chunks.push(chunk);
  }

  query(queryVector: number[], topK = 3): SearchResult[] {
    const scored = this.chunks.map(chunk => ({
      chunk,
      score: cosineSimilarity(queryVector, chunk.embedding)
    }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  size(): number {
    return this.chunks.length;
  }
}
