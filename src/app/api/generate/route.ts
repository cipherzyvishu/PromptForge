import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, model } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Default model if not specified
    const selectedModel = model || 'openai/gpt-3.5-turbo';
    
    // Prepare system prompt to enhance responses
    const systemPrompt = "You are a helpful AI assistant that provides clear, concise, and accurate responses.";
    
    console.log(`Generating response using model: ${selectedModel}`);
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'PromptForge App',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        // Add some formatting parameters
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json({ 
        error: errorData.error?.message || `API Error: ${response.status} ${response.statusText}` 
      }, { status: response.status });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || '';

    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.error('Generate API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


