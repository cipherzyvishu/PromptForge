"use client";

import { Hero } from "@/components/hero";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/lib/auth/AuthProvider";

type ActionType = {
  label: string;
  href: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

export default function Home() {
  const { user } = useAuth();

  // Define actions based on authentication state
  const actions: ActionType[] = [
    {
      label: "Browse Prompts",
      href: "/explore",
      variant: "outline",
    },
  ];

  // Only add sign-in button if user is not authenticated
  if (!user) {
    actions.push({
      label: "Sign In",
      href: "/auth",
      variant: "default",
    });
  }

  return (
    <div>
      <Navigation />
      <Hero
        title="Turn prompts into tools. Build once. Use forever."
        subtitle="Create modular prompt templates, test them instantly, and supercharge your AI workflow. No fluff. Just clarity."
        actions={actions}
      />
    </div>
  );
}
