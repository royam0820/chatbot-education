import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { topic, query } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": `You are an educational assistant specialized in ${topic}. Only answer questions related to ${topic}. If the question is not related to ${topic}, politely inform the user that you can only answer questions about ${topic}.`},
        {"role": "user", "content": query}
      ],
    });

    return NextResponse.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}