import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cosineSimilarity, simpleEmbedding } from '../src/math.ts';
import { RagAgent } from '../src/agent.ts';

describe('cosineSimilarity', () => {
  it('retorna 1.0 para vetores idênticos e 0.0 para ortogonais', () => {
    assert.equal(Math.round(cosineSimilarity([1, 0], [1, 0])), 1);
    assert.equal(cosineSimilarity([1, 0], [0, 1]), 0);
  });
});

describe('RagAgent', () => {
  it('armazena documentos e recupera o chunk mais semanticamente relevante', () => {
    const agent = new RagAgent();
    agent.addDocument('ts-guide', 'TypeScript adds static type definitions to enhance code safety.');
    agent.addDocument('db-guide', 'PostgreSQL provides robust relational storage with ACID guarantees.');

    const results = agent.retrieveContext('TypeScript static types', 1);
    assert.equal(results.length, 1);
    assert.equal(results[0].chunk.docId, 'ts-guide');
    assert.ok(results[0].chunk.text.includes('TypeScript'));
  });

  it('sintetiza prompt formatado com as evidências recuperadas', () => {
    const agent = new RagAgent();
    agent.addDocument('faq', 'Our refund policy allows returns within 30 days.');

    const prompt = agent.synthesizePrompt('What is the refund window?');
    assert.ok(prompt.includes('Context:'));
    assert.ok(prompt.includes('refund policy'));
    assert.ok(prompt.includes('Question: What is the refund window?'));
  });
});
