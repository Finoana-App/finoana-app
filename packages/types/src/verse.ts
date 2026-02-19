import { z } from 'zod';

/**
 * Verse of the day schema
 */
export const VerseOfTheDaySchema = z.object({
  citation: z.string(),
  passage: z.string(),
  images: z.array(z.string()),
  version: z.string(),
});

/**
 * Verse of the day type
 */
export type VerseOfTheDay = z.infer<typeof VerseOfTheDaySchema>;
