import OpenAI from 'openai';
import { InferenceClient } from '@huggingface/inference';
import summarizeReviewPrompt from '../prompts/summarizeReviewLlama.txt';

type GenerateResponseQuery = {
   prompt: string;
   instructions?: string;
   previousResponseId?: string;
   maxOutputTokens?: number;
};

type GenerateResponseResult = {
   message: string;
   id: string;
};

type SummarizeTextQuery = {
   text: string;
};

type SummarizeTextResult = {
   summary: string;
};

export class LlmProvider {
   constructor(private readonly openAiClient: OpenAI) {}
   async generateResponse({
      prompt,
      instructions,
      previousResponseId,
      maxOutputTokens,
   }: GenerateResponseQuery): Promise<GenerateResponseResult> {
      const response = await this.openAiClient.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         instructions,
         previous_response_id: previousResponseId,
         temperature: 0.2,
         max_output_tokens: maxOutputTokens,
      });

      return { message: response.output_text, id: response.id };
   }

   async summarize({ text }: SummarizeTextQuery): Promise<SummarizeTextResult> {
      const output = await inferenceClient.summarization({
         model: 'facebook/bart-large-cnn',
         inputs: text,
         provider: 'hf-inference',
      });
      return { summary: output.summary_text };
   }

   async summarizeReviews({
      text: reviews,
   }: SummarizeTextQuery): Promise<SummarizeTextResult> {
      const chatCompletion = await inferenceClient.chatCompletion({
         provider: 'novita',
         model: 'meta-llama/Llama-3.1-8B-Instruct',
         messages: [
            {
               role: 'system',
               content: summarizeReviewPrompt,
            },
            {
               role: 'user',
               content: reviews,
            },
         ],
      });

      return { summary: chatCompletion?.choices[0]?.message.content ?? '' };
   }
}

const openAiClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

export const llmProvider = new LlmProvider(openAiClient);
