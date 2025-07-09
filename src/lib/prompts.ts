export interface Prompt {
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

export const mockPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Creative Writing Assistant',
    description: 'Generate engaging stories and creative content with customizable tone and style.',
    category: 'Writing',
    tags: ['creative', 'storytelling', 'content'],
    template: 'Write a {type} story about {topic} in a {tone} tone. The target audience is {audience}. Make it approximately {length} words.',
    variables: [
      {
        name: 'type',
        type: 'select',
        options: ['short', 'adventure', 'mystery', 'romance', 'sci-fi']
      },
      {
        name: 'topic',
        type: 'text',
        placeholder: 'e.g., a lost treasure, time travel, friendship'
      },
      {
        name: 'tone',
        type: 'select',
        options: ['playful', 'serious', 'humorous', 'dramatic', 'mysterious']
      },
      {
        name: 'audience',
        type: 'select',
        options: ['children', 'teenagers', 'adults', 'professionals']
      },
      {
        name: 'length',
        type: 'select',
        options: ['100', '300', '500', '1000']
      }
    ],
    author: 'Sarah Chen',
    likes: 142,
    usageCount: 1250,
    createdAt: '2024-12-15'
  },
  {
    id: '2',
    title: 'Business Email Generator',
    description: 'Create professional business emails for any situation with the right tone.',
    category: 'Business',
    tags: ['email', 'professional', 'communication'],
    template: 'Write a {type} business email to {recipient} about {subject}. The tone should be {tone} and include {action}.',
    variables: [
      {
        name: 'type',
        type: 'select',
        options: ['follow-up', 'introduction', 'proposal', 'thank you', 'meeting request']
      },
      {
        name: 'recipient',
        type: 'text',
        placeholder: 'e.g., potential client, team member, manager'
      },
      {
        name: 'subject',
        type: 'text',
        placeholder: 'e.g., project proposal, meeting follow-up'
      },
      {
        name: 'tone',
        type: 'select',
        options: ['formal', 'friendly', 'urgent', 'appreciative', 'persuasive']
      },
      {
        name: 'action',
        type: 'text',
        placeholder: 'e.g., schedule a meeting, request feedback'
      }
    ],
    author: 'David Kim',
    likes: 98,
    usageCount: 890,
    createdAt: '2024-12-10'
  },
  {
    id: '3',
    title: 'Social Media Caption Creator',
    description: 'Generate engaging social media captions with hashtags and emojis.',
    category: 'Marketing',
    tags: ['social media', 'marketing', 'engagement'],
    template: 'Create a {platform} caption for a post about {topic}. Style: {style}. Include relevant hashtags and make it {length}. Target audience: {audience}.',
    variables: [
      {
        name: 'platform',
        type: 'select',
        options: ['Instagram', 'Twitter', 'LinkedIn', 'Facebook', 'TikTok']
      },
      {
        name: 'topic',
        type: 'text',
        placeholder: 'e.g., product launch, behind the scenes, tips'
      },
      {
        name: 'style',
        type: 'select',
        options: ['casual', 'professional', 'funny', 'inspirational', 'educational']
      },
      {
        name: 'length',
        type: 'select',
        options: ['short and punchy', 'medium length', 'detailed']
      },
      {
        name: 'audience',
        type: 'text',
        placeholder: 'e.g., young professionals, parents, entrepreneurs'
      }
    ],
    author: 'Maria Rodriguez',
    likes: 76,
    usageCount: 654,
    createdAt: '2024-12-08'
  },
  {
    id: '4',
    title: 'Code Documentation Writer',
    description: 'Generate clear and comprehensive documentation for your code.',
    category: 'Development',
    tags: ['coding', 'documentation', 'technical'],
    template: 'Write documentation for a {language} {type}. The code does: {functionality}. Include {sections}. Target audience: {audience}.',
    variables: [
      {
        name: 'language',
        type: 'select',
        options: ['JavaScript', 'Python', 'Java', 'TypeScript', 'React', 'Node.js']
      },
      {
        name: 'type',
        type: 'select',
        options: ['function', 'class', 'API endpoint', 'component', 'module']
      },
      {
        name: 'functionality',
        type: 'text',
        placeholder: 'e.g., processes user input, fetches data from API'
      },
      {
        name: 'sections',
        type: 'select',
        options: ['overview only', 'parameters and return values', 'examples and usage', 'full documentation']
      },
      {
        name: 'audience',
        type: 'select',
        options: ['beginner developers', 'experienced developers', 'team members', 'external users']
      }
    ],
    author: 'Alex Thompson',
    likes: 134,
    usageCount: 445,
    createdAt: '2024-12-05'
  },
  {
    id: '5',
    title: 'Learning Explainer',
    description: 'Explain complex topics in simple, easy-to-understand language.',
    category: 'Education',
    tags: ['learning', 'explanation', 'teaching'],
    template: 'Explain {topic} to a {audience}. Use {approach} and include {examples}. Make it {length} and {tone}.',
    variables: [
      {
        name: 'topic',
        type: 'text',
        placeholder: 'e.g., machine learning, photosynthesis, financial markets'
      },
      {
        name: 'audience',
        type: 'select',
        options: ['5-year-old', 'high school student', 'college student', 'adult beginner', 'professional']
      },
      {
        name: 'approach',
        type: 'select',
        options: ['analogies and metaphors', 'step-by-step breakdown', 'real-world examples', 'visual descriptions']
      },
      {
        name: 'examples',
        type: 'select',
        options: ['practical examples', 'everyday analogies', 'case studies', 'no examples']
      },
      {
        name: 'length',
        type: 'select',
        options: ['brief overview', 'detailed explanation', 'comprehensive guide']
      },
      {
        name: 'tone',
        type: 'select',
        options: ['conversational', 'academic', 'enthusiastic', 'professional']
      }
    ],
    author: 'Dr. Emily Watson',
    likes: 89,
    usageCount: 723,
    createdAt: '2024-12-01'
  },
  {
    id: '6',
    title: 'Product Description Generator',
    description: 'Create compelling product descriptions that convert browsers into buyers.',
    category: 'E-commerce',
    tags: ['product', 'sales', 'copywriting'],
    template: 'Write a {style} product description for {product}. Highlight {features} and target {audience}. Include {elements} and make it {length}.',
    variables: [
      {
        name: 'product',
        type: 'text',
        placeholder: 'e.g., wireless headphones, organic skincare cream'
      },
      {
        name: 'style',
        type: 'select',
        options: ['persuasive', 'informative', 'luxury', 'casual', 'technical']
      },
      {
        name: 'features',
        type: 'text',
        placeholder: 'e.g., battery life, organic ingredients, premium materials'
      },
      {
        name: 'audience',
        type: 'select',
        options: ['tech enthusiasts', 'health-conscious consumers', 'budget shoppers', 'luxury buyers', 'professionals']
      },
      {
        name: 'elements',
        type: 'select',
        options: ['benefits and features', 'emotional appeal', 'technical specs', 'social proof', 'urgency']
      },
      {
        name: 'length',
        type: 'select',
        options: ['short and punchy', 'detailed description', 'comprehensive overview']
      }
    ],
    author: 'Mark Johnson',
    likes: 67,
    usageCount: 412,
    createdAt: '2024-11-28'
  },
  {
    id: '7',
    title: 'Resume Bullet Point Generator',
    description: 'Craft strong bullet points for resumes with action verbs and quantifiable impact.',
    category: 'Career',
    tags: ['resume', 'job hunting', 'career'],
    template: 'Create a resume bullet point for a {role} position at a {industry} company. Focus on {achievement} using a {tone} tone.',
    variables: [
      { name: 'role', type: 'text', placeholder: 'e.g., software engineer, product manager' },
      { name: 'industry', type: 'text', placeholder: 'e.g., finance, tech, education' },
      { name: 'achievement', type: 'text', placeholder: 'e.g., boosting user engagement, reducing downtime' },
      { name: 'tone', type: 'select', options: ['impactful', 'concise', 'results-driven'] }
    ],
    author: 'Nina Patel',
    likes: 59,
    usageCount: 300,
    createdAt: '2024-11-25'
  },
  {
    id: '8',
    title: 'YouTube Video Script Writer',
    description: 'Generate engaging YouTube scripts for different genres and audiences.',
    category: 'Content Creation',
    tags: ['video', 'script', 'youtube'],
    template: 'Write a script for a {type} YouTube video about {topic}, targeting {audience}. Style should be {style} and include {elements}.',
    variables: [
      { name: 'type', type: 'select', options: ['tutorial', 'vlog', 'review', 'explainer'] },
      { name: 'topic', type: 'text', placeholder: 'e.g., AI tools, travel hacks, smartphone review' },
      { name: 'audience', type: 'text', placeholder: 'e.g., beginners, travelers, tech lovers' },
      { name: 'style', type: 'select', options: ['informal', 'engaging', 'educational'] },
      { name: 'elements', type: 'select', options: ['hook and CTA', 'humor', 'statistics', 'storytelling'] }
    ],
    author: 'Jason Lee',
    likes: 83,
    usageCount: 504,
    createdAt: '2024-11-22'
  },
  {
    id: '9',
    title: 'Interview Question Generator',
    description: 'Generate tailored interview questions for different roles and experience levels.',
    category: 'HR & Hiring',
    tags: ['interview', 'recruitment', 'questions'],
    template: 'Generate {level} interview questions for a {role} role in the {industry} sector. Focus on {skills}.',
    variables: [
      { name: 'level', type: 'select', options: ['entry-level', 'mid-level', 'senior-level'] },
      { name: 'role', type: 'text', placeholder: 'e.g., backend developer, UI/UX designer' },
      { name: 'industry', type: 'text', placeholder: 'e.g., healthcare, fintech, SaaS' },
      { name: 'skills', type: 'text', placeholder: 'e.g., problem-solving, data structures, teamwork' }
    ],
    author: 'Priya Mehta',
    likes: 112,
    usageCount: 652,
    createdAt: '2024-11-18'
  },
  {
    id: '10',
    title: 'Ad Copy Generator',
    description: 'Create compelling ad copies that drive clicks and conversions.',
    category: 'Marketing',
    tags: ['ads', 'copywriting', 'PPC'],
    template: 'Write an ad copy for a {product} targeting {audience}. Focus on {valueProposition} with a {tone} tone. Include {cta}.',
    variables: [
      { name: 'product', type: 'text', placeholder: 'e.g., online course, mobile app' },
      { name: 'audience', type: 'text', placeholder: 'e.g., students, freelancers, small business owners' },
      { name: 'valueProposition', type: 'text', placeholder: 'e.g., saves time, increases revenue' },
      { name: 'tone', type: 'select', options: ['bold', 'trustworthy', 'casual'] },
      { name: 'cta', type: 'select', options: ['Buy now', 'Sign up today', 'Learn more'] }
    ],
    author: 'Liam Nguyen',
    likes: 74,
    usageCount: 388,
    createdAt: '2024-11-15'
  },
  {
    id: '11',
    title: 'Customer Support Response Generator',
    description: 'Create helpful and empathetic replies for customer support situations.',
    category: 'Customer Service',
    tags: ['support', 'customer', 'response'],
    template: 'Respond to a customer who is experiencing {issue} with a {tone} tone. The response should include {solution} and be directed to a {customerType}.',
    variables: [
      { name: 'issue', type: 'text', placeholder: 'e.g., delayed shipment, product malfunction' },
      { name: 'tone', type: 'select', options: ['empathetic', 'professional', 'friendly'] },
      { name: 'solution', type: 'text', placeholder: 'e.g., refund, replacement, apology with coupon' },
      { name: 'customerType', type: 'select', options: ['new customer', 'returning customer', 'angry customer'] }
    ],
    author: 'Ravi Sharma',
    likes: 93,
    usageCount: 489,
    createdAt: '2024-11-12'
  },
  {
    id: '12',
    title: 'Daily Journal Prompt Generator',
    description: 'Inspire daily reflection and mindfulness through thoughtful journal prompts.',
    category: 'Wellness',
    tags: ['journal', 'reflection', 'mindfulness'],
    template: 'Create a daily journaling prompt focusing on {theme} for {audience}. Style should be {style}.',
    variables: [
      { name: 'theme', type: 'select', options: ['gratitude', 'goals', 'self-awareness', 'productivity', 'relationships'] },
      { name: 'audience', type: 'text', placeholder: 'e.g., teenagers, entrepreneurs, new parents' },
      { name: 'style', type: 'select', options: ['deep', 'light-hearted', 'motivational', 'inquisitive'] }
    ],
    author: 'Zara Bloom',
    likes: 64,
    usageCount: 301,
    createdAt: '2024-11-10'
  },
  {
    id: '13',
    title: 'Event Invitation Writer',
    description: 'Generate elegant and themed invitations for various types of events.',
    category: 'Lifestyle',
    tags: ['invitation', 'events', 'writing'],
    template: 'Write a {style} invitation for a {event} happening on {date}. Target audience is {audience} and the message should include {details}.',
    variables: [
      { name: 'style', type: 'select', options: ['formal', 'casual', 'fun', 'minimal'] },
      { name: 'event', type: 'text', placeholder: 'e.g., wedding, birthday party, seminar' },
      { name: 'date', type: 'text', placeholder: 'e.g., July 15th, 2025' },
      { name: 'audience', type: 'text', placeholder: 'e.g., friends, clients, colleagues' },
      { name: 'details', type: 'text', placeholder: 'e.g., location, dress code, RSVP link' }
    ],
    author: 'Carla Gomez',
    likes: 51,
    usageCount: 210,
    createdAt: '2024-11-07'
  },
  {
    id: '14',
    title: 'Fitness Plan Creator',
    description: 'Build custom fitness routines based on goals and preferences.',
    category: 'Health & Fitness',
    tags: ['fitness', 'routine', 'health'],
    template: 'Create a {duration} fitness plan for someone who wants to {goal}. Focus on {intensity} and include {workoutTypes}.',
    variables: [
      { name: 'duration', type: 'select', options: ['1-week', '1-month', '3-months'] },
      { name: 'goal', type: 'text', placeholder: 'e.g., build muscle, lose weight, increase stamina' },
      { name: 'intensity', type: 'select', options: ['low', 'moderate', 'high'] },
      { name: 'workoutTypes', type: 'text', placeholder: 'e.g., cardio, strength training, yoga' }
    ],
    author: 'Jake Reynolds',
    likes: 77,
    usageCount: 344,
    createdAt: '2024-11-03'
  },
  {
    id: '15',
    title: 'Recipe Idea Generator',
    description: 'Generate creative and tasty recipe ideas based on available ingredients and diet.',
    category: 'Food & Cooking',
    tags: ['recipe', 'cooking', 'meal planning'],
    template: 'Suggest a recipe using {ingredients}. The recipe should be suitable for a {diet} and take around {time} to prepare. Cuisine: {cuisine}.',
    variables: [
      { name: 'ingredients', type: 'text', placeholder: 'e.g., eggs, spinach, tomatoes' },
      { name: 'diet', type: 'select', options: ['vegetarian', 'vegan', 'keto', 'gluten-free'] },
      { name: 'time', type: 'select', options: ['15 minutes', '30 minutes', '1 hour'] },
      { name: 'cuisine', type: 'select', options: ['Italian', 'Indian', 'Mexican', 'American', 'Asian'] }
    ],
    author: 'Sophia Tan',
    likes: 69,
    usageCount: 278,
    createdAt: '2024-11-01'
  },
  {
    id: '16',
    title: 'FAQ Generator for Products',
    description: 'Generate frequently asked questions and answers for product listings.',
    category: 'E-commerce',
    tags: ['faq', 'products', 'customer help'],
    template: 'Create FAQs for a {product} targeting {audience}. Focus on {concerns} and format in a {tone} tone.',
    variables: [
      { name: 'product', type: 'text', placeholder: 'e.g., electric scooter, skincare serum' },
      { name: 'audience', type: 'text', placeholder: 'e.g., teens, working professionals, first-time users' },
      { name: 'concerns', type: 'text', placeholder: 'e.g., usage, warranty, safety' },
      { name: 'tone', type: 'select', options: ['professional', 'friendly', 'casual'] }
    ],
    author: 'Danielle Brooks',
    likes: 55,
    usageCount: 198,
    createdAt: '2024-10-30'
  }
];

export const getPromptsByCategory = (category?: string) => {
  if (!category) return mockPrompts;
  return mockPrompts.filter(prompt => prompt.category === category);
};

export const getPromptById = (id: string) => {
  return mockPrompts.find(prompt => prompt.id === id);
};

export const getCategories = () => {
  return Array.from(new Set(mockPrompts.map(prompt => prompt.category)));
};

export const searchPrompts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return mockPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(lowercaseQuery) ||
    prompt.description.toLowerCase().includes(lowercaseQuery) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
