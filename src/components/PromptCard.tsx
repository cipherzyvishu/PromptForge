"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { Badge } from "@/components/ui/badge";
import { Prompt } from "@/lib/prompts";
import { Heart, Users } from "lucide-react";

interface PromptCardProps {
  prompt: Prompt;
}

const PromptCard = ({ prompt }: PromptCardProps) => {
  return (
    <div className="h-[320px] w-full flex items-center justify-center">
      <PinContainer title="Try Prompt" href={`/playground?id=${prompt.id}`}>
        <div className="flex flex-col p-4 tracking-tight text-slate-100/90 w-[280px] h-[240px] bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md border border-slate-600/40 rounded-xl shadow-xl">
          {/* Header with Category Badge */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs px-2 py-0.5">
              {prompt.category}
            </Badge>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {prompt.likes}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {prompt.usageCount}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-100 mb-2 leading-tight">
            {prompt.title}
          </h3>
          
          {/* Description */}
          <p className="text-xs text-slate-300 leading-relaxed mb-3 flex-1 line-clamp-2">
            {prompt.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {prompt.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-0.5 text-xs bg-slate-700/60 text-slate-300 rounded-full border border-slate-600/40"
              >
                #{tag}
              </span>
            ))}
            {prompt.tags.length > 2 && (
              <span className="px-2 py-0.5 text-xs text-slate-400">
                +{prompt.tags.length - 2}
              </span>
            )}
          </div>

          {/* Footer with Author */}
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>by {prompt.author}</span>
            <span className="text-blue-400 font-medium">Try it →</span>
          </div>
        </div>
      </PinContainer>
    </div>
  )
}

export default PromptCard