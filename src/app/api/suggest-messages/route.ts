import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const prompt = "As an employee of Chaupal Company, suggest three key points the company should consider for improvement or growth. Provide actionable and practical suggestions. Separate each suggestion with '||'.The suggestions should reflect ideas such as enhancing team collaboration, improving customer satisfaction, or adopting new technologies."

    const result = streamText({
        model: openai('gpt-4o'),
        prompt
    });

    return result.toDataStreamResponse();
}