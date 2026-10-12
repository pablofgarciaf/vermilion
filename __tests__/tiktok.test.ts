import { describe, expect, it } from 'vitest';
import { buildAuthorizeUrl, chunkRange, planChunks, signState, verifyState } from '@/lib/tiktok';

const MB = 1024 * 1024;

describe('planChunks', () => {
  it('sube en una sola parte los videos de hasta 64 MB', () => {
    expect(planChunks(3 * MB)).toEqual({ chunkSize: 3 * MB, totalChunks: 1 });
    expect(planChunks(64 * MB)).toEqual({ chunkSize: 64 * MB, totalChunks: 1 });
  });

  it('parte los videos grandes en trozos de 10 MB y la última parte absorbe el resto', () => {
    const size = 95 * MB + 123;
    const { chunkSize, totalChunks } = planChunks(size);
    expect(chunkSize).toBe(10 * MB);
    expect(totalChunks).toBe(9);
    const last = chunkRange(totalChunks - 1, size, chunkSize, totalChunks);
    expect(last.end).toBe(size - 1);
    expect(last.end - last.start + 1).toBeLessThanOrEqual(64 * MB);
    expect(chunkRange(0, size, chunkSize, totalChunks)).toEqual({ start: 0, end: 10 * MB - 1 });
  });

  it('rechaza tamaños inválidos', () => {
    expect(() => planChunks(0)).toThrow();
    expect(() => planChunks(1.5)).toThrow();
    expect(() => planChunks(5 * 1024 * MB)).toThrow();
  });
});

describe('state OAuth', () => {
  const secret = 'test-secret';
  const state = { n: 'nonce', l: 'en', u: 'admin@example.com', e: Date.now() + 60_000 };

  it('acepta un state firmado y vigente', () => {
    expect(verifyState(signState(state, secret), secret)).toEqual(state);
  });

  it('rechaza un state alterado, con otra clave o vencido', () => {
    const token = signState(state, secret);
    const [payload, sig] = token.split('.');
    const forged = Buffer.from(JSON.stringify({ ...state, u: 'attacker@example.com' })).toString('base64url');
    expect(verifyState(`${forged}.${sig}`, secret)).toBeNull();
    expect(verifyState(`${payload}.${sig}`, 'other-secret')).toBeNull();
    expect(verifyState(signState({ ...state, e: Date.now() - 1 }, secret), secret)).toBeNull();
    expect(verifyState('garbage', secret)).toBeNull();
  });
});

describe('buildAuthorizeUrl', () => {
  it('pide solo los permisos user.info.basic y video.upload', () => {
    const url = new URL(buildAuthorizeUrl('key123', 'https://www.vermilionroutes.com/api/tiktok/callback', 'st'));
    expect(url.origin + url.pathname).toBe('https://www.tiktok.com/v2/auth/authorize/');
    expect(url.searchParams.get('scope')).toBe('user.info.basic,video.upload');
    expect(url.searchParams.get('client_key')).toBe('key123');
    expect(url.searchParams.get('response_type')).toBe('code');
    expect(url.searchParams.get('state')).toBe('st');
  });
});
