import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { topic, message, history } = await req.json();

  const openai = new OpenAI({
    apiKey: (process.env.OPENAI_API_KEY as string),
  });

  const prompt = `You are an educational AI assistant specializing in ${topic}. 
    // ... (rest of the prompt remains the same)
    User's question: ${message}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Change to a supported model
      messages: [
        { role: "system", content: prompt },
        ...history,
        { role: "user", content: message }
      ],
    });

    return NextResponse.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}