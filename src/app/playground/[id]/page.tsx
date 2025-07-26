'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { promptService } from '@/lib/services/promptService';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Copy, Heart, TrendingUp, Sparkles, AlertCircle, Zap, Edit3, Save, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Database prompt type (simplified - no variables)
type DatabasePrompt = {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  likes: number;
  usage_count: number;
  is_featured: boolean;
  author?: string;
}

export default function PlaygroundPage() {
  const params = useParams();
  const id = params.id as string
  
  const [prompt, setPrompt] = useState<DatabasePrompt | null>(null);
  const [editedPrompt, setEditedPrompt] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompt = async () => {
      setLoading(true);
      try {
        // Handle test prompts for non-authenticated users
        if (id === 'test') {
          const testData = localStorage.getItem('testPrompt');
          if (testData) {
            const testPrompt = JSON.parse(testData);
            const databasePrompt: DatabasePrompt = {
              id: 'test',
              title: testPrompt.title || 'Test Prompt',
              description: testPrompt.description || 'Testing prompt functionality',
              prompt: testPrompt.prompt,
              category: testPrompt.category || 'general',
              tags: testPrompt.tags || [],
              likes: 0,
              usage_count: 0,
              is_featured: false,
              author: 'You'
            };
            
            setPrompt(databasePrompt);
            setEditedPrompt(databasePrompt.prompt || '');
            console.log('Test prompt loaded:', databasePrompt);
          } else {
            setError('No test prompt found');
          }
        } else {
          // Fetch prompt from database
          const dbPrompt = await promptService.getPrompt(id);
          if (dbPrompt) {
            const databasePrompt: DatabasePrompt = {
              id: dbPrompt.id,
              title: dbPrompt.title,
              description: dbPrompt.description,
              prompt: dbPrompt.prompt,
              category: dbPrompt.category,
              tags: dbPrompt.tags,
              likes: dbPrompt.likes,
              usage_count: dbPrompt.usage_count,
              is_featured: dbPrompt.is_featured,
              author: dbPrompt.profiles?.full_name || dbPrompt.profiles?.username || 'Anonymous'
            };
            
            setPrompt(databasePrompt);
            setEditedPrompt(databasePrompt.prompt || '');
            console.log('Database prompt loaded:', databasePrompt);
          } else {
            setError('Prompt not found');
          }
        }
      } catch (error) {
        console.error('Error fetching prompt:', error);
        setError('Failed to load prompt');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPrompt();
    }
  }, [id]);

  const generateAIResponse = async () => {
    if (!prompt) {
      toast.error('No prompt available');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    setShowAiResponse(false);
    
    try {
      // Increment usage count only for real prompts (not test prompts)
      if (id !== 'test') {
        await promptService.incrementUsage(id);
      }
      
      // Call the API with the prompt content
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: isEditing ? editedPrompt : prompt.prompt,
          model: 'gemini-2.5-pro' // Using Gemini model
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setAiResponse(data.text || 'No response received');
      setShowAiResponse(true);
      toast.success('Response generated successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate response';
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
      console.error('Error generating AI response:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPrompt = () => {
    const promptText = isEditing ? editedPrompt : prompt?.prompt;
    if (promptText) {
      navigator.clipboard.writeText(promptText);
      toast.success('Prompt copied to clipboard!');
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Save changes
      setIsEditing(false);
      toast.success('Changes saved!');
    } else {
      // Start editing
      setIsEditing(true);
      if (prompt?.prompt) {
        setEditedPrompt(prompt.prompt);
      }
    }
  };

  const resetPrompt = () => {
    if (prompt?.prompt) {
      setEditedPrompt(prompt.prompt);
      toast.success('Prompt reset to original!');
    }
  };

  const copyResponse = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse);
      toast.success('Response copied to clipboard!');
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
              <p className="text-gray-400 mb-4">{error}</p>
              <Link href={id === 'test' ? '/builder' : '/explore'}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {id === 'test' ? 'Back to Builder' : 'Back to Explore'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle no prompt found
  if (!prompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Prompt not found</h1>
              <p className="text-gray-400 mb-4">The prompt you&apos;re looking for doesn&apos;t exist.</p>
              <Link href={id === 'test' ? '/builder' : '/explore'}>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {id === 'test' ? 'Back to Builder' : 'Back to Explore'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10 max-w-7xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href={id === 'test' ? '/builder' : '/explore'}>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {id === 'test' ? 'Back to Builder' : 'Back to Explore'}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Prompt Header */}
          <div className="space-y-3 max-w-6xl">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                {prompt.category}
              </Badge>
              {prompt.is_featured && (
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                  Featured
                </Badge>
              )}
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/10 text-white border-white/20">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-white">{prompt.title}</h1>
            <p className="text-lg lg:text-xl text-gray-300">{prompt.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {prompt.likes}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {prompt.usage_count} uses
              </div>
              <div>by {prompt.author}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-6xl">
            {/* Prompt Content */}
            <Card className="p-5 bg-black/40 backdrop-blur-sm border-white/20">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-white">Prompt</h2>
                <div className="flex items-center gap-2">
                  {isEditing && (
                    <Button
                      onClick={resetPrompt}
                      variant="outline"
                      size="sm"
                      className="border-orange-500/50 text-orange-300 hover:bg-orange-500/10"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  )}
                  <Button
                    onClick={toggleEdit}
                    variant="outline"
                    size="sm"
                    className={`${
                      isEditing 
                        ? 'border-green-500/50 text-green-300 hover:bg-green-500/10' 
                        : 'border-blue-500/50 text-blue-300 hover:bg-blue-500/10'
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={copyPrompt}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>

              {isEditing && (
                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-md">
                  <p className="text-blue-300 text-sm flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    You are now editing the prompt. Changes will be used for AI generation.
                  </p>
                </div>
              )}

              <Textarea
                value={isEditing ? editedPrompt : prompt.prompt}
                onChange={(e) => isEditing && setEditedPrompt(e.target.value)}
                readOnly={!isEditing}
                placeholder={isEditing ? "Edit your prompt here..." : ""}
                className={`min-h-[280px] border-white/20 text-white resize-none transition-all duration-200 ${
                  isEditing 
                    ? 'bg-black/30 border-blue-500/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50' 
                    : 'bg-black/20 cursor-default'
                }`}
              />
              
              {isEditing && (
                <div className="mt-4 text-sm text-gray-400">
                  Character count: {editedPrompt.length}
                </div>
              )}
            </Card>

            {/* AI Response */}
            <Card className="p-5 bg-black/40 backdrop-blur-sm border-white/20">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  AI Response
                </h2>
                {showAiResponse && (
                  <Button
                    onClick={copyResponse}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>

              <Button
                onClick={generateAIResponse}
                disabled={isGenerating}
                className="w-full mb-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
              
              <AnimatePresence mode="wait">
                {showAiResponse ? (
                  <motion.div
                    key="ai-result"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Textarea
                      value={aiResponse}
                      readOnly
                      className="min-h-[280px] bg-black/20 border-white/20 text-white resize-none"
                    />
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-red-900/30 border border-red-500/50 rounded-md text-red-200"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Error generating response</h3>
                        <p className="text-sm opacity-90">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ai-placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-[280px] flex items-center justify-center border-2 border-dashed border-white/20 rounded-md"
                  >
                    <p className="text-gray-500 text-center">
                      Click &quot;Generate with AI&quot; to get an AI-powered response based on this prompt.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
