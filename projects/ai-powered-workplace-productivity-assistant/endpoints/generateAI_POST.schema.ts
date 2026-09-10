import { z } from "zod";

export const generateAIInput = z.object({
  mode: z.string().min(1),
  input: z.string().min(1),
  history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1) })).max(20).optional(),
});

export type GenerateAIInput = z.infer<typeof generateAIInput>;
export type GenerateAIOutput = { text: string; sources: string[]; model: string; provider: string; usedWebSearch: boolean; usedCodeInterpreter: boolean };
