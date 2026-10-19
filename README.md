# Custom Chatbot RAG Agent

Modular, deterministic Retrieval-Augmented Generation (RAG) agent engine designed for hermetic local AI applications, documentation querying, and context synthesis using dense vector indexing and cosine similarity.

[![CI](https://github.com/FelipeMadson/custom-chatbot-rag-agent/actions/workflows/ci.yml/badge.svg)](https://github.com/FelipeMadson/custom-chatbot-rag-agent/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*Read this in [Português](README.pt-BR.md).*

---

## Architecture

- **Recursive Chunking**: Splits large technical corpora into overlapping semantic chunks preserving sentence boundaries.
- **Dense Vector Index**: In-memory dense vector storage supporting high-speed cosine similarity ranking.
- **Context Window Synthesizer**: Formats retrieved top-K context evidence into structured prompt payloads with token budget limits.

---

## Usage

```typescript
import { RagAgent, VectorStore, TextChunker } from './src/index.ts';

const agent = new RagAgent();
agent.addDocument('doc-1', 'TypeScript provides compile-time type safety.');
agent.addDocument('doc-2', 'PostgreSQL supports ACID compliance and JSONB operators.');

const context = agent.retrieveContext('How does TypeScript handle types?', 1);
console.log(context);
```

## License

MIT © [Felipe Madson](https://github.com/FelipeMadson)
