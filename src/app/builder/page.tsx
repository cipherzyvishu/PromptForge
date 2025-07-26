"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Sparkles, LogIn, Zap, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { promptService } from "@/lib/services/promptService";
import Navigation from "@/components/Navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [saving, setSaving] = useState(false);

  const savePrompt = async () => {
    if (!user) {
      toast.error('Please sign in to save prompts');
      return;
    }

    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setSaving(true);
    try {
      const promptData = {
        user_id: user.id,
        title: title.trim() || 'Untitled Prompt', // Provide fallback instead of null
        prompt: prompt.trim(),
        description: 'AI prompt created with PromptForge', // Provide fallback
        category: 'general', // Let database auto-categorize
        tags: [],
        likes: 0,
        usage_count: 0
      };

      const savedPrompt = await promptService.createPrompt(promptData);
      
      if (savedPrompt) {
        toast.success('Prompt saved successfully!');
        // Clear the form
        setTitle("");
        setPrompt("");
        // Redirect to the saved prompt
        router.push(`/playground/${savedPrompt.id}`);
      }
    } catch (error: unknown) {
      console.error('Error saving prompt:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save prompt';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const testPrompt = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to test');
      return;
    }
    
    // Save to localStorage for testing without account
    const testData = {
      title: title || 'Untitled Prompt',
      prompt: prompt,
      category: 'general',
      tags: [],
      isTest: true
    };
    localStorage.setItem('testPrompt', JSON.stringify(testData));
    
    // Redirect to a test playground
    router.push('/playground/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />
            Quick Prompt Builder
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 px-4">
            Create and save your AI prompts in seconds
          </p>
          
          {!user && !authLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-blue-200 justify-center">
                <LogIn className="h-5 w-5" />
                <span className="text-sm">Sign in to save prompts permanently!</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-black/40 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-white">
                What would you like AI to help you with?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Optional Title */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Title <span className="text-gray-500">(optional)</span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your prompt a name..."
                  className="bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to auto-generate from your prompt
                </p>
              </div>
              
              {/* Prompt Content - Main Field */}
              <div>
                <label className="text-lg font-medium text-white mb-3 block">
                  Your Prompt
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Write your AI prompt here... 

For example:
• Write a professional email to...
• Explain the concept of...
• Create a marketing strategy for...
• Help me debug this code...
• Generate creative ideas for...`}
                  className="bg-black/20 border-white/20 text-white placeholder-gray-400 min-h-[200px] text-base leading-relaxed focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
                />
                <p className="text-sm text-gray-400 mt-2">
                  Character count: {prompt.length}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {user ? (
                  <>
                    <Button 
                      onClick={savePrompt}
                      disabled={saving || !prompt.trim()}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 text-base font-medium"
                    >
                      {saving ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Save className="w-5 h-5 mr-2" />
                      )}
                      {saving ? 'Saving...' : 'Save & Test Prompt'}
                    </Button>
                    <Button 
                      onClick={testPrompt}
                      disabled={!prompt.trim()}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 h-12 text-base"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Quick Test
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={testPrompt}
                    disabled={!prompt.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 text-base font-medium"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Test This Prompt
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>

              {/* Help Text */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  {user 
                    ? "Your prompt will be automatically categorized and tagged for easy discovery."
                    : "Sign in to save your prompts permanently and share them with the community."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="p-6 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Auto-Categorized</h3>
            <p className="text-gray-400 text-sm">
              We automatically categorize your prompts based on content
            </p>
          </div>
          <div className="p-6 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg">
            <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Instant Testing</h3>
            <p className="text-gray-400 text-sm">
              Test your prompts immediately with AI generation
            </p>
          </div>
          <div className="p-6 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg">
            <Save className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">One-Click Save</h3>
            <p className="text-gray-400 text-sm">
              Save and share your prompts with just one click
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
