'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth/AuthProvider';
import { promptService } from '@/lib/services/promptService';
import toast from 'react-hot-toast';

interface StorePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function StorePromptModal({ isOpen, onClose, onSuccess }: StorePromptModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prompt: '',
    category: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle prompt change (simplified - no variable detection)
  const handlePromptChange = (value: string) => {
    setFormData(prev => ({ ...prev, prompt: value }));
  };

  // Form validation (simplified)
  const isFormValid = () => {
    return formData.title.trim() && 
           formData.prompt.trim() &&
           formData.category.trim();
  };

  // Save prompt to database (simplified - no variables)
  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save prompts');
      return;
    }

    if (!isFormValid()) {
      toast.error('Please fill in the title, prompt, and category fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const promptData = {
        user_id: user.id,
        title: formData.title,
        description: formData.description || `Custom prompt: ${formData.title}`, 
        prompt: formData.prompt,
        category: formData.category,
        tags: formData.tags.length > 0 ? formData.tags : ['custom'], 
        likes: 0,
        usage_count: 0,
        is_featured: false
      };

      await promptService.createPrompt(promptData);
      toast.success('Prompt saved successfully!');
      
      // Reset form
      setFormData({ title: '', description: '', prompt: '', category: '', tags: [] });
      setTagInput('');
      
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error('Error saving prompt:', error);
      toast.error('Failed to save prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add tag functionality
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
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
    if (e.key === 'Escape') {
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
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title <span className="text-red-400">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a descriptive title for your prompt"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this prompt does and when to use it"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[80px]"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., business, creative-writing, technical, education"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">Main category for your prompt</p>
              </div>

              {/* Prompt */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Prompt <span className="text-red-400">*</span>
                </label>
                <Textarea
                  value={formData.prompt}
                  onChange={(e) => handlePromptChange(e.target.value)}
                  placeholder="Enter your complete prompt here. Make it specific and detailed.&#10;&#10;Example:&#10;Write a professional email to a client about a project update. Include project status, next milestones, and request feedback on the current progress."
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[120px] font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Write a complete, ready-to-use prompt
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Add tags (e.g., writing, business, creative)"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-700"
                  >
                    Add
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-blue-900/50 text-blue-300 border-blue-700 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Click on tags to remove them
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800/50">
            <div className="text-sm text-gray-400">
              {!isFormValid() && (
                <span>Please fill all required fields</span>
              )}
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
