import OpenAI from 'openai';

type GenerateResponseQuery = {
   prompt: string;
   instructions?: string;
   previousResponseId?: string;
};

type GenerateResponseResult = {
   message: string;
   id: string;
};

export class LlmProvider {
   constructor(private readonly openAiClient: OpenAI) {}
   async generateResponse({
      prompt,
      instructions,
      previousResponseId,
   }: GenerateResponseQuery): Promise<GenerateResponseResult> {
      const response = await this.openAiClient.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         instructions,
         previous_response_id: previousResponseId,
         temperature: 0.2,
         max_output_tokens: 500,
      });

      return { message: response.output_text, id: response.id };
   }
}

const openAiClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

export const llmProvider = new LlmProvider(openAiClient);
