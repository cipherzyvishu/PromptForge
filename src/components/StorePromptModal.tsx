"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth/AuthProvider";
import { promptService } from "@/lib/services/promptService";
import toast from "react-hot-toast";

interface StorePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function StorePromptModal({
  isOpen,
  onClose,
  onSuccess,
}: StorePromptModalProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form validation
  const isFormValid = () => {
    return prompt.trim().length > 0;
  };

  // Save prompt to database
  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to save prompts");
      return;
    }

    if (!isFormValid()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);

    try {
      const promptData = {
        user_id: user.id,
        title: title.trim() || "Untitled Prompt",
        description: "AI prompt created with PromptForge",
        prompt: prompt.trim(),
        category: "general",
        tags: [],
        likes: 0,
        usage_count: 0,
        is_featured: false,
      };

      await promptService.createPrompt(promptData);
      toast.success("Prompt saved successfully!");

      // Reset form
      setTitle("");
      setPrompt("");

      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving prompt:", error);
      toast.error("Failed to save prompt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle ESC key and outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle ESC key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-gray-900 rounded-lg border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Store Your Prompt</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="space-y-6">
              {/* Optional Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title <span className="text-gray-500">(optional)</span>
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your prompt a name..."
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to auto-generate from your prompt
                </p>
              </div>

              {/* Prompt */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Your Prompt <span className="text-red-400">*</span>
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
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[200px] text-base leading-relaxed"
                />
                <p className="text-sm text-gray-400 mt-2">
                  Character count: {prompt.length}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800/50">
            <div className="text-sm text-gray-400">
              {!isFormValid() && <span>Please enter a prompt</span>}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!isFormValid() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 text-base font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Prompt
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
