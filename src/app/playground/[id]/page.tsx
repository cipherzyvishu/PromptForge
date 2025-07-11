'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { mockPrompts, type Prompt } from '@/lib/prompts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Play, Copy, Heart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function PlaygroundPage() {
  const params = useParams();
  const id = params.id as string
  
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const foundPrompt = mockPrompts.find(p => p.id === id);
    if (foundPrompt) {
      setPrompt(foundPrompt);
      // Initialize variables with empty values
      const initialVariables: Record<string, string> = {};
      foundPrompt.variables.forEach(variable => {
        initialVariables[variable.name] = '';
      });
      setVariables(initialVariables);
    }
  }, [id]);

  const handleVariableChange = (name: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePrompt = async () => {
    if (!prompt) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let result = prompt.template;
    
    // Replace variables in template
    prompt.variables.forEach(variable => {
      const value = variables[variable.name] || `{${variable.name}}`;
      result = result.replace(new RegExp(`{${variable.name}}`, 'g'), value);
    });
    
    setGeneratedPrompt(result);
    setShowResult(true);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  // Handle prompt not found
  if (!prompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link href="/explore" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explore
          </Link>
          
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold text-white">Prompt Not Found</h1>
              <p className="text-gray-400 text-lg">The prompt you&apos;re looking for doesn&apos;t exist.</p>
              <Link href="/explore">
                <Button className="mt-6">
                  Browse Prompts
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const allFieldsFilled = prompt.variables.every(variable => variables[variable.name]?.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        <Link href="/explore" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explore
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Prompt Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/10 text-white border-white/20">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl font-bold text-white">{prompt.title}</h1>
            <p className="text-xl text-gray-300">{prompt.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {prompt.likes}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {prompt.usageCount} uses
              </div>
              <div>by {prompt.author}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Variables Form */}
            <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6">Customize Variables</h2>
              
              <div className="space-y-4">
                {prompt.variables.map((variable) => (
                  <motion.div
                    key={variable.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-medium text-gray-300 capitalize">
                      {variable.name}
                    </label>
                    
                    {variable.type === 'text' ? (
                      <Input
                        placeholder={variable.placeholder}
                        value={variables[variable.name] || ''}
                        onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                        className="bg-black/20 border-white/20 text-white placeholder:text-gray-500"
                      />
                    ) : (
                      <select
                        value={variables[variable.name] || ''}
                        onChange={(e) => handleVariableChange(variable.name, e.target.value)}
                        className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select {variable.name}</option>
                        {variable.options?.map((option) => (
                          <option key={option} value={option} className="bg-gray-900">
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={generatePrompt}
                disabled={!allFieldsFilled || isLoading}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Generate Prompt
                  </>
                )}
              </Button>
            </Card>

            {/* Result */}
            <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Generated Prompt</h2>
                {showResult && (
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {showResult ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Textarea
                      value={generatedPrompt}
                      readOnly
                      className="min-h-[200px] bg-black/20 border-white/20 text-white resize-none"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-white/20 rounded-md"
                  >
                    <p className="text-gray-500 text-center">
                      Fill in the variables and click &quot;Generate Prompt&quot; to see your customized prompt here.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>

          {/* Template Preview */}
          <Card className="p-6 bg-black/40 backdrop-blur-sm border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Template</h2>
            <div className="bg-black/20 p-4 rounded-md border border-white/10">
              <code className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                {prompt.template}
              </code>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
