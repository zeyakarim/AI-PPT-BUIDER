
import { z } from 'zod';

export const promptSchema = z.object({
  prompt: z.string().min(20, "Please provide a detailed topic (at least 20 characters) for the presentation."),
});

export type PromptInput = z.infer<typeof promptSchema>;

// Export the types needed for the chat flow
export interface Slide {
  title: string;
  content: string | string[];
  layout?: 'TITLE' | 'TEXT' | 'TITLE_AND_CONTENT';
}

export interface Presentation {
  title: string;
  slides: Slide[];
}