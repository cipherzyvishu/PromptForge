import { Hero } from "@/components/hero";
import Navigation from "@/components/Navigation";

export default function Home() {
 return (
    <div>
      <Navigation />
      <Hero
        title="Turn prompts into tools. Build once. Use forever."
        subtitle="Create modular prompt templates, test them instantly, and supercharge your AI workflow. No fluff. Just clarity."
        actions={[
          {
            label: "Browse Prompts",
            href: "/explore",
            variant: "outline"
          }
        ]}
      />
    </div>
  );
}
