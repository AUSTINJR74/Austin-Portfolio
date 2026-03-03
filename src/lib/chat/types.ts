export type ChatMessage = {
    id: string;
    role: "user" | "bot";
    content: string;
    suggestions?: string[];
    ts: number;
  };
  
  export type PromptItem = {
    name: string;
    subject: string;
    meta: string;
    prompt: string;
    active?: boolean;
  };

  export type Topic =
    | "ssr"
    | "cms"
    | "performance"
    | "analytics"
    | "backend"
    | "general";

  export type Reply = {
    content: string;
    suggestions?: string[];
    topic?: Topic;
  };