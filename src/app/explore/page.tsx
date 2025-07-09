import PromptCard from "@/components/PromptCard";
import { mockPrompts } from "@/lib/prompts";

export default function ExplorePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Subtle dark overlay circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-700/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gray-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-800/3 rounded-full blur-3xl"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Explore Prompts</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover powerful AI prompts created by the community. Test them instantly and enhance your workflow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          {mockPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  );
}
