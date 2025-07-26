# 🚀 PromptForge

**A modern AI prompt marketplace and playground with database storage built with Next.js**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cipherzyvishu/PromptForge)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-prompt--forge--taupe.vercel.app-blue)](https://prompt-forge-taupe.vercel.app/)

---

## ✨ Overview

PromptForge is a streamlined AI prompt marketplace and testing platform built for quality and simplicity. Think "Prompt Gallery for AI" - discover professionally crafted prompts, test them instantly with Google's Gemini AI, create your own high-quality prompts, and share them with the community. We've simplified the experience by focusing on complete, ready-to-use prompts rather than complex variable systems.

### 🎯 Key Features

- **🔍 Explore High-Quality Prompts**: Browse 15+ professionally crafted prompts across 7 categories
- **🧪 Instant AI Testing**: Test any prompt immediately with Google Gemini AI integration
- **💾 Simple Prompt Creation**: Create and save complete, text-based prompts to database  
- **📂 Smart Categorization**: Organized by Business, Content, Technical, Education, Creative, Research & Analysis
- **⭐ Featured Prompts**: Curated collection of the highest quality prompts
- **👤 User Profiles**: Personal prompt libraries and profile management
- **🎨 Modern UI**: Dark glassmorphism design with smooth animations
- **📱 Responsive**: Mobile-first design that works on all devices
- **🚀 Fast**: Built with Next.js 15 and optimized for performance
- **🔒 Secure**: User authentication and database-backed storage

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 15 (App Router) | Full-stack React framework |
| **Database** | Supabase | PostgreSQL database with real-time subscriptions |
| **Authentication** | Supabase Auth | User authentication and session management |
| **Styling** | Tailwind CSS v4 | Utility-first CSS framework |
| **Components** | shadcn/ui | Pre-built accessible components |
| **Icons** | Lucide React | Beautiful SVG icons |
| **Animations** | Framer Motion | Smooth animations and transitions |
| **AI Integration** | Google Gemini API | Advanced AI text generation |
| **Deployment** | Vercel | Serverless hosting platform |
| **Language** | TypeScript | Type-safe JavaScript |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key (get one at [Google AI Studio](https://aistudio.google.com/app/apikey))
- Supabase account (for database - create one at [supabase.com](https://supabase.com))

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
   # Google Gemini API Configuration
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Supabase Configuration  
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anonymous_key
   
   # Site Configuration
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
│   │   ├── explore/           # Main prompt gallery and discovery page
│   │   ├── builder/           # Prompt creation page (legacy - redirects to store modal)
│   │   ├── playground/[id]/   # Individual prompt testing and AI generation
│   │   ├── profile/[userId]/  # User profile and prompt management
│   │   ├── auth/callback/     # Supabase authentication callback
│   │   ├── api/generate/      # Google Gemini AI integration endpoint
│   │   ├── layout.tsx         # Root layout with providers and navigation
│   │   └── page.tsx          # Landing page with features overview
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui base components (Button, Card, etc.)
│   │   ├── Navigation.tsx    # Main navigation with auth integration
│   │   └── StorePromptModal.tsx # Simplified prompt creation modal
│   └── lib/                  # Utilities and services
│       ├── auth/             # Supabase authentication providers
│       ├── services/         # Database service layer (promptService.ts)
│       ├── supabase/         # Supabase client and type definitions
│       └── utils.ts          # Helper functions and utilities
├── public/                   # Static assets and icons
├── package.json             # Dependencies and build scripts
└── tailwind.config.js       # Tailwind CSS configuration
```

---

## 🎮 Usage

### Exploring Prompts
1. Visit the `/explore` page to browse 15+ professionally crafted prompts from the database
2. Browse prompts by category: Business, Content, Technical, Education, Creative, Research & Analysis
3. Each prompt card shows title, description, category, tags, likes, and usage stats
4. Featured prompts (⭐) highlight the highest quality, most popular prompts
5. Click "Try Now" to test a prompt directly in the playground
6. Click "Store Prompt" to create your own prompt (requires authentication)

### Creating & Storing Prompts  
1. Click "Store Prompt" on the explore page or profile page
2. Enter a descriptive title for your prompt
3. Write a complete, ready-to-use prompt (no variables needed)
4. Select an appropriate category from the dropdown
5. Add relevant tags to help others discover your prompt
6. Click "Save" to store your prompt in the database

### Testing Prompts
1. Navigate to `/playground/[prompt-id]` from any prompt card
2. View the complete prompt text ready for AI use
3. Click "Generate with AI" to get an instant response via Google Gemini
4. Copy the prompt to use in other AI tools
5. Like prompts you find useful to help the community

### Managing Your Prompts
1. Go to `/profile/me` to view and manage your stored prompts  
2. View your prompt statistics and community engagement
3. Edit your profile information and avatar
4. Browse prompts by other community members
5. Track likes and usage statistics for your prompts

---

## � Featured Prompt Categories

PromptForge comes with 15+ high-quality, professionally crafted prompts across 7 main categories:

### 🏢 Business & Professional
- **Business Strategy Consultant** - Comprehensive business analysis and strategic recommendations
- **Executive Email Writer** - Professional email composition for executives  
- **Market Research Analyst** - In-depth market analysis and insights

### ✍️ Content Creation
- **SEO Content Strategist** - Search-optimized content creation
- **Social Media Content Creator** - Engaging social media content across platforms
- **Technical Documentation Writer** - Clear and comprehensive technical documentation

### 🎓 Education & Learning
- **Curriculum Designer** - Structured learning curriculum development
- **Complex Concept Explainer** - Simplify complex topics for any audience

### 💻 Technology & Development  
- **Code Review Expert** - Comprehensive code analysis and improvement suggestions
- **System Architecture Designer** - Scalable system design and architecture

### 🎨 Creative Writing
- **Creative Story Developer** - Engaging narrative creation and development
- **Brand Voice Designer** - Distinctive brand personality and communication style

### 🔬 Research & Analysis
- **Research Methodology Expert** - Comprehensive research design and execution
- **Data Analysis Interpreter** - Insights extraction from complex data
- **Competitive Intelligence Analyst** - Strategic competitive analysis

Each prompt is:
- ✅ **Complete and Ready-to-Use** - No variables or setup required
- ✅ **Professionally Crafted** - Written by experts in each domain
- ✅ **AI-Optimized** - Designed to work excellently with modern AI models
- ✅ **Community Tested** - Validated by usage and feedback

---

## �🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key for AI responses | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL for API headers | No |

### Getting API Keys

#### Google Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account  
3. Click "Create API Key"
4. Copy the generated API key to your `.env.local`

#### Supabase Configuration
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project settings
3. Copy the project URL and anonymous key to your `.env.local`
4. The database schema will be automatically set up when you first run the app

### Supported AI Models

The app currently supports Google Gemini models including:
- `gemini-1.5-flash` (default - fast and cost-effective)
- `gemini-1.5-pro` (more capable for complex tasks)
- `gemini-pro` (legacy model)

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
   - Add your `GEMINI_API_KEY` from Google AI Studio
   - Add your `NEXT_PUBLIC_SUPABASE_URL` from your Supabase project
   - Add your `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project  
   - Set `NEXT_PUBLIC_SITE_URL` to your Vercel domain

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

---

## 🎨 Customization

### Database Schema

The app uses Supabase with a simplified, efficient schema:

**prompts table:**
- `id`: UUID primary key (auto-generated)
- `user_id`: Foreign key to auth.users
- `title`: Prompt title
- `description`: Brief description of the prompt's purpose
- `prompt`: Complete, ready-to-use prompt text (no variables)
- `category`: Prompt category (business, content, technical, etc.)
- `tags`: Array of searchable tag strings
- `likes`: Number of community likes
- `usage_count`: Number of times the prompt was tested
- `is_featured`: Boolean flag for high-quality prompts
- `created_at`: Creation timestamp
- `updated_at`: Last modification timestamp

**profiles table:**
- `id`: UUID primary key (matches auth.users.id)
- `username`: Unique username for the user
- `full_name`: User's display name
- `avatar_url`: Profile picture URL
- `created_at`: Account creation timestamp
- `updated_at`: Last profile update timestamp

**Key Features of the Schema:**
- ✅ Simplified design focuses on complete, usable prompts
- ✅ Category-based organization for easy discovery
- ✅ Featured flag highlights community favorites
- ✅ Usage tracking for popularity metrics
- ✅ Full-text search capability on titles and descriptions

### Adding Custom Features

The modular architecture makes it easy to extend:

1. **New AI Models**: Update `/api/generate/route.ts`
2. **Database Changes**: Modify Supabase schema and update TypeScript types
3. **UI Components**: Add to `/components` directory with proper TypeScript types
4. **New Pages**: Add to `/app` directory following Next.js App Router conventions

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
- [Supabase](https://supabase.com/) for the backend-as-a-service platform
- [Google Gemini](https://ai.google.dev/) for the powerful AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
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

### ✅ Completed Features
- [x] Simplified prompt schema (text-only, no variables)
- [x] High-quality starter prompts across 7 categories
- [x] Category-based prompt organization
- [x] Featured prompts system
- [x] Instant AI testing with Google Gemini
- [x] User authentication and profiles
- [x] Database storage and persistence
- [x] Modern responsive UI

### 🚧 In Progress
- [ ] Advanced search and filtering by category/tags
- [ ] Prompt analytics dashboard
- [ ] Community engagement features (comments, better ratings)

### 🔮 Future Enhancements
- [ ] Command palette (Cmd+K) for quick navigation
- [ ] Prompt collections and folders
- [ ] Advanced AI model options (Claude, GPT-4, etc.)
- [ ] API access for developers
- [ ] Prompt usage analytics and insights
- [ ] Export/import prompt collections
- [ ] Collaborative prompt sharing
- [ ] Advanced prompt templates
- [ ] Mobile app for iOS/Android

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [cipherzyvishu](https://github.com/cipherzyvishu)

</div>
