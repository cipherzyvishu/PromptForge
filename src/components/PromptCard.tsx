"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { Badge } from "@/components/ui/badge";
import { Heart, Users } from "lucide-react";
import { Database } from "@/lib/supabase/types";

// Database Prompt type
type DatabasePrompt = Database['public']['Tables']['prompts']['Row'] & {
  profiles?: {
    username: string | null
    full_name: string | null
  }
}

// Legacy mock Prompt type for backward compatibility
interface LegacyPrompt {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  template: string;
  variables: {
    name: string;
    type: 'text' | 'select';
    placeholder?: string;
    options?: string[];
  }[];
  author: string;
  likes: number;
  usageCount: number;
  createdAt: string;
}

interface PromptCardProps {
  prompt: DatabasePrompt | LegacyPrompt;
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  // Helper function to get author name
  const getAuthor = (prompt: DatabasePrompt | LegacyPrompt): string => {
    if ('author' in prompt) {
      return prompt.author
    } else if ('profiles' in prompt && prompt.profiles) {
      return prompt.profiles.full_name || prompt.profiles.username || 'Anonymous'
    }
    return 'Anonymous'
  }

  // Helper function to get usage count
  const getUsageCount = (prompt: DatabasePrompt | LegacyPrompt): number => {
    if ('usageCount' in prompt) {
      return prompt.usageCount
    } else {
      return prompt.usage_count
    }
  }

  // Helper function to get category
  const getCategory = (prompt: DatabasePrompt | LegacyPrompt): string => {
    if ('category' in prompt && prompt.category) {
      return prompt.category
    }
    return 'General'
  }

  return (
    <div className="h-[320px] w-full flex items-center justify-center">
      <PinContainer title="Try Prompt" href={`/playground/${prompt.id}`}>
        <div className="flex flex-col p-5 tracking-tight text-slate-100/90 w-[420px] h-[280px] bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md border border-gray-700/40 rounded-xl shadow-xl">
          {/* Header with Category Badge */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs px-2 py-0.5">
              {getCategory(prompt)}
            </Badge>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {prompt.likes}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {getUsageCount(prompt)}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-100 mb-3 leading-tight">
            {prompt.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed mb-4 flex-1 line-clamp-3">
            {prompt.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {prompt.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-gray-800/60 text-slate-300 rounded-full border border-gray-600/40"
              >
                #{tag}
              </span>
            ))}
            {prompt.tags.length > 2 && (
              <span className="px-2 py-1 text-xs text-slate-400">
                +{prompt.tags.length - 2}
              </span>
            )}
          </div>

          {/* Footer with Author */}
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>by {getAuthor(prompt)}</span>
            <span className="text-blue-400 font-medium">Try it →</span>
          </div>
        </div>
      </PinContainer>
    </div>
  )
}

export default PromptCard