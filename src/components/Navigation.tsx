import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          PromptForge
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link href="/playground" className="text-muted-foreground hover:text-foreground transition-colors">
            Playground
          </Link>
          <Link href="/builder" className="text-muted-foreground hover:text-foreground transition-colors">
            Builder
          </Link>
        </div>

        {/* CTA Button */}
        <Button asChild variant="default" size="sm">
          <Link href="/builder">
            Create Prompt
          </Link>
        </Button>
      </div>
    </nav>
  );
}
