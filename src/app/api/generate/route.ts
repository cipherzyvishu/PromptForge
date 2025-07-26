import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { prompt, model } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.' 
      }, { status: 500 });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
    
    // Select model (default to gemini-1.5-flash for better performance/cost)
    const selectedModel = model || 'gemini-2.5-flash-lite';
    
    console.log(`Generating response using Gemini model: ${selectedModel}`);
    
    // Generate response using the correct API structure
    const result = await genAI.models.generateContent({
      model: selectedModel,
      contents: [{ parts: [{ text: prompt }] }]
    });
    
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ error: 'No response generated from Gemini' }, { status: 500 });
    }

    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.error('Gemini API error:', error);
    
    // Handle specific Gemini API errors
    if (error instanceof Error) {
      // Check for common Gemini API error patterns
      if (error.message.includes('API_KEY_INVALID')) {
        return NextResponse.json({ 
          error: 'Invalid Gemini API key. Please check your GEMINI_API_KEY environment variable.' 
        }, { status: 401 });
      }
      if (error.message.includes('QUOTA_EXCEEDED')) {
        return NextResponse.json({ 
          error: 'Gemini API quota exceeded. Please check your usage limits.' 
        }, { status: 429 });
      }
      if (error.message.includes('SAFETY')) {
        return NextResponse.json({ 
          error: 'Content blocked by Gemini safety filters. Please try a different prompt.' 
        }, { status: 400 });
      }
      
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}


