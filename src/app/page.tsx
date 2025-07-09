import { Hero } from "@/components/hero";
export default function Home() {
 return (
    <Hero
      title="Turn prompts into tools. Build once. Use forever."
      subtitle="Create modular prompt templates, test them instantly, and supercharge your AI workflow. No fluff. Just clarity."
      actions={[
        {
          label: "Browse Prompts",
          href: "#",
          variant: "outline"
        },
        {
          label: "Try Playground",
          href: "#",
          variant: "default"
        }
      ]}
    />
  );
}
