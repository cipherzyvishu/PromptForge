# 🚀 PromptForge

**A modern, free AI prompt marketplace and playground built with Next.js**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cipherzyvishu/PromptForge)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-prompt--forge--taupe.vercel.app-blue)](https://prompt-forge-taupe.vercel.app/)

---

## ✨ Overview

PromptForge is a beautiful, fully-featured AI prompt platform that allows users to explore, test, build, and share AI prompts with zero monthly cost. Think "Canva for AI Prompts" - discover high-quality prompts, try them live with real AI models, create prompt templates with variables, and share them with the community.

### 🎯 Key Features

- **🔍 Explore Prompts**: Browse a curated collection of AI prompts with beautiful card layouts
- **🧪 Live Testing**: Test prompts in real-time with OpenRouter AI integration
- **🛠️ Prompt Builder**: Create custom prompt templates with dynamic variables
- **🎨 Modern UI**: Dark glassmorphism design with smooth animations
- **📱 Responsive**: Mobile-first design that works on all devices
- **🚀 Fast**: Built with Next.js 15 and optimized for performance
- **💰 Free**: Completely free to use and deploy

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 15 (App Router) | Full-stack React framework |
| **Styling** | Tailwind CSS v4 | Utility-first CSS framework |
| **Components** | shadcn/ui | Pre-built accessible components |
| **Icons** | Lucide React | Beautiful SVG icons |
| **Animations** | Framer Motion | Smooth animations and transitions |
| **AI Integration** | OpenRouter API | Access to multiple AI models |
| **Deployment** | Vercel | Serverless hosting platform |
| **Language** | TypeScript | Type-safe JavaScript |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cipherzyvishu/PromptForge.git
   cd PromptForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── explore/           # Prompt gallery page
│   │   ├── builder/           # Prompt creation page
│   │   ├── playground/[id]/   # Dynamic prompt testing page
│   │   ├── api/generate/      # OpenRouter API integration
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx          # Landing page
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   └── Navigation.tsx    # Main navigation component
│   └── lib/                  # Utilities and data
│       ├── prompts.ts        # Mock prompt data
│       └── utils.ts          # Helper functions
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
└── tailwind.config.js       # Tailwind CSS configuration
```

---

## 🎮 Usage

### Exploring Prompts
1. Visit the `/explore` page to browse available prompts
2. Each prompt card shows title, description, tags, and usage stats
3. Click "Try Now" to test a prompt in the playground

### Testing Prompts
1. Navigate to `/playground/[prompt-id]` from any prompt card
2. Fill in the required variables for the prompt template
3. Click "Generate Prompt" to see the customized prompt
4. Click "Generate with AI" to get a real AI response via OpenRouter

### Building Prompts
1. Go to `/builder` to create your own prompt templates
2. Add variables using the `{variableName}` syntax
3. Preview your prompt in real-time
4. Save your prompt template locally

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key for AI responses | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL for API headers | No |

### Supported AI Models

The app currently supports OpenRouter models including:
- `openai/gpt-3.5-turbo`
- `mistralai/mixtral-8x7b-instruct`
- `anthropic/claude-3-haiku`
- And many more available through OpenRouter

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **One-click deploy**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cipherzyvishu/PromptForge)

2. **Manual deployment**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Set environment variables in Vercel dashboard**
   - Add your `OPENROUTER_API_KEY`
   - Set `NEXT_PUBLIC_SITE_URL` to your Vercel domain

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

---

## 🎨 Customization

### Adding New Prompts

Edit `src/lib/prompts.ts` to add new prompts to the explore page:

```typescript
export const mockPrompts: Prompt[] = [
  {
    id: 'new-prompt',
    title: 'Your Prompt Title',
    description: 'Prompt description',
    template: 'Your prompt template with {variables}',
    variables: [
      { name: 'variable', type: 'text', placeholder: 'Enter value...' }
    ],
    tags: ['tag1', 'tag2'],
    author: 'Your Name',
    likes: 0,
    usageCount: 0
  }
];
```

### Styling

The app uses Tailwind CSS with a custom dark theme. Key design elements:
- **Colors**: Dark background with purple/blue accents
- **Effects**: Glassmorphism with backdrop blur
- **Typography**: Clean, modern font hierarchy
- **Animations**: Framer Motion for smooth transitions

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add TypeScript types for new features
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [OpenRouter](https://openrouter.ai/) for AI model access
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the icon library

---

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. **Check existing issues** on GitHub
2. **Create a new issue** with detailed information
3. **Join our community** for discussions and support

---

## 🔮 Roadmap

- [ ] User authentication and accounts
- [ ] Prompt sharing and community features
- [ ] Advanced search and filtering
- [ ] Command palette (Cmd+K) for quick navigation
- [ ] Prompt analytics and usage tracking
- [ ] API rate limiting and usage controls
- [ ] More AI model integrations
- [ ] Prompt versioning and history

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [cipherzyvishu](https://github.com/cipherzyvishu)

</div>
