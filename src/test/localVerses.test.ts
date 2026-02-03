import { describe, it, expect } from 'vitest';
import { LOCAL_VERSES, getDailyLocalVerse } from '@/data/localVerses';

describe('Local Verses Rotation', () => {
  it('should have at least 31 verses in the collection', () => {
    expect(LOCAL_VERSES.length).toBeGreaterThanOrEqual(31);
  });

  it('should return a verse with all required fields', () => {
    const verse = getDailyLocalVerse();
    
    expect(verse).toHaveProperty('verse_reference');
    expect(verse).toHaveProperty('verse_text');
    expect(verse).toHaveProperty('devotional');
    expect(verse).toHaveProperty('prayer');
    expect(verse).toHaveProperty('date');
    
    expect(verse.verse_reference).toBeTruthy();
    expect(verse.verse_text).toBeTruthy();
  });

  it('should return today\'s date in the verse', () => {
    const verse = getDailyLocalVerse();
    const today = new Date().toISOString().split('T')[0];
    
    expect(verse.date).toBe(today);
  });

  it('should rotate based on day of year', () => {
    // The function uses dayOfYear % LOCAL_VERSES.length
    // So verse index should be predictable
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const expectedIndex = dayOfYear % LOCAL_VERSES.length;
    
    const verse = getDailyLocalVerse();
    expect(verse.verse_reference).toBe(LOCAL_VERSES[expectedIndex].verse_reference);
  });

  it('should have unique verses in the collection', () => {
    const references = LOCAL_VERSES.map(v => v.verse_reference);
    const uniqueReferences = new Set(references);
    
    expect(uniqueReferences.size).toBe(LOCAL_VERSES.length);
  });
});
