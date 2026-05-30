export type QuizOption = {
  text: string;
  score: number;
};

export type QuizQuestion = {
  questionText: string;
  options: QuizOption[];
};

export type QuizLevel = {
  minScore: number;
  maxScore: number;
  title: string;
  color: string;
  description: string;
};

export const questions: QuizQuestion[] = [
  {
    questionText: 'What does "GPT" stand for in ChatGPT?',
    options: [
      { text: "General Purpose Tech", score: 0 },
      { text: "Generative Pre-trained", score: 2 },
      { text: "Global Processing Tool", score: 0 },
      { text: "Graphical Processing", score: 0 },
    ],
  },
  {
    questionText: 'Which is a common strategy to get better answers from AI?',
    options: [
      { text: "Type in ALL CAPS", score: 0 },
      { text: "Use single-word prompts", score: 0 },
      { text: "Assign it a specific persona", score: 2 },
      { text: "Make it guess your intent", score: 0 },
    ],
  },
  {
    questionText: 'What is an AI "hallucination"?',
    options: [
      { text: "Making up false information confidently", score: 2 },
      { text: "Discovering hidden visual features", score: 0 },
      { text: "When the server crashes", score: 0 },
      { text: "A creative writing mode feature", score: 0 },
    ],
  },
  {
    questionText: 'Which tool is primarily known for generating AI images?',
    options: [
      { text: "Midjourney", score: 2 },
      { text: "Microsoft Excel", score: 0 },
      { text: "TensorFlow", score: 0 },
      { text: "GitHub Copilot", score: 0 },
    ],
  },
  {
    questionText: 'What is the main purpose of "System Instructions" or "Custom Instructions"?',
    options: [
      { text: "To make the AI run faster", score: 0 },
      { text: "To set persistent rules and behavior", score: 2 },
      { text: "To connect the AI to the internet", score: 0 },
      { text: "To change the UI color scheme", score: 0 },
    ],
  },
  {
    questionText: 'What does "context window" refer to in Large Language Models?',
    options: [
      { text: "The physical screen size", score: 0 },
      { text: "How much text it can remember in one chat", score: 2 },
      { text: "A pop-up menu for settings", score: 0 },
      { text: "The speed at which it generates words", score: 0 },
    ],
  },
  {
    questionText: 'Which AI model family is famously open-weight/open-source?',
    options: [
      { text: "GPT-4 (OpenAI)", score: 0 },
      { text: "Claude 3 (Anthropic)", score: 0 },
      { text: "LLaMA (Meta)", score: 2 },
      { text: "Gemini (Google)", score: 0 },
    ],
  },
  {
    questionText: 'What does RAG stand for in advanced AI terminology?',
    options: [
      { text: "Random Access Generation", score: 0 },
      { text: "Rapid AI Growth", score: 0 },
      { text: "Retrieval-Augmented Generation", score: 2 },
      { text: "Responsive Algorithm Group", score: 0 },
    ],
  },
  {
    questionText: 'Which task is an LLM traditionally worst at without external tools?',
    options: [
      { text: "Translating languages", score: 0 },
      { text: "Summarizing long text", score: 0 },
      { text: "Solving complex math equations", score: 2 },
      { text: "Writing rhyming poetry", score: 0 },
    ],
  },
  {
    questionText: 'What is a "token" in the context of Language Models?',
    options: [
      { text: "A piece of a word used for processing", score: 2 },
      { text: "A cryptocurrency used to pay for AI", score: 0 },
      { text: "A security password", score: 0 },
      { text: "A block of an image", score: 0 },
    ],
  },
  {
    questionText: 'Which technique gives the AI examples before asking for an answer?',
    options: [
      { text: "Zero-shot prompting", score: 0 },
      { text: "Few-shot prompting", score: 2 },
      { text: "Chain-of-thought", score: 0 },
      { text: "Negative prompting", score: 0 },
    ],
  },
];

export const levels: QuizLevel[] = [
  {
    minScore: 0,
    maxScore: 8,
    title: "AI Apprentice 🌱",
    color: "from-emerald-400 to-teal-500",
    description:
      "You're just starting your journey! AI is vast, but you've taken the first step. Keep exploring and asking questions.",
  },
  {
    minScore: 9,
    maxScore: 14,
    title: "Prompt Explorer 🧭",
    color: "from-blue-400 to-indigo-500",
    description:
      "You know your way around the basics. You understand how to interact with AI and get useful results. Time to dig into advanced techniques!",
  },
  {
    minScore: 15,
    maxScore: 19,
    title: "AI Navigator 🚀",
    color: "from-purple-400 to-pink-500",
    description:
      "Impressive! You understand the nuances of AI, hallucinations, and context. You use AI as a powerful daily tool.",
  },
  {
    minScore: 20,
    maxScore: 22,
    title: "Prompt Wizard 🧙‍♂️",
    color: "from-amber-400 to-orange-500",
    description:
      "Flawless! You are a master of prompting, understanding architectures, and navigating the AI landscape. You probably teach others how to use it!",
  },
];
