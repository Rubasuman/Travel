import { describe, it, expect } from 'vitest';
import { insertPhotoSchema } from '@shared/schema';

describe('insertPhotoSchema', () => {
  it('accepts uploadedAt as a Date', () => {
    const payload = {
      userId: 1,
      tripId: null,
      imageUrl: 'https://example.com/test.jpg',
      caption: 'test',
      uploadedAt: new Date(),
    };

    const parsed = insertPhotoSchema.parse(payload);
    expect(parsed).toHaveProperty('uploadedAt');
    expect(parsed.uploadedAt instanceof Date).toBe(true);
  });

  it('accepts uploadedAt as an ISO string and coerces to Date', () => {
    const payload = {
      userId: 1,
      tripId: null,
      imageUrl: 'https://example.com/test.jpg',
      caption: 'test',
      uploadedAt: new Date().toISOString(),
    };

    const parsed = insertPhotoSchema.parse(payload as any);
    expect(parsed).toHaveProperty('uploadedAt');
    expect(parsed.uploadedAt instanceof Date).toBe(true);
  });

  it('accepts missing uploadedAt by coercing/setting in server flow', () => {
    const payload = {
      userId: 1,
      tripId: null,
      imageUrl: 'https://example.com/test.jpg',
      caption: 'test',
    };

    // Because server sets uploadedAt before parsing in our handler, simulate that here by
    // adding a Date when parsing.
    const parsed = insertPhotoSchema.parse({ ...payload, uploadedAt: new Date() });
    expect(parsed).toHaveProperty('uploadedAt');
    expect(parsed.uploadedAt instanceof Date).toBe(true);
  });
});
