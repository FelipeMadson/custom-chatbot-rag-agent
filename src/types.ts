export interface DocumentChunk {
  id: string;
  docId: string;
  text: string;
  embedding: number[];
}

export interface SearchResult {
  chunk: DocumentChunk;
  score: number;
}
